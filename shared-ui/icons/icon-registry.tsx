import Image from 'next/image'
import type { ComponentProps } from 'react'

export type IconName =
  | 'add'
  | 'alert'
  | 'alert-red'
  | 'attachment'
  | 'command'
  | 'compass'
  | 'cross'
  | 'cry'
  | 'dropdown'
  | 'filters'
  | 'heart'
  | 'home'
  | 'info'
  | 'logo'
  | 'plus'
  | 'right-arrow'
  | 'rightarrow'
  | 'search'
  | 'search-placeholder'
  | 'setting'
  | 'star'
  | 'thumbnail'
  | 'usa-flag'
  | 'voices'
  | 'wave'

export interface IconProps extends Omit<ComponentProps<typeof Image>, 'src' | 'alt'> {
  name: IconName
  size?: number | string
  className?: string
  alt?: string
}

const iconPaths: Record<IconName, string> = {
  add: '/icons/add.svg',
  alert: '/icons/alert.svg',
  'alert-red': '/icons/alert-red.svg',
  attachment: '/icons/attachment.svg',
  command: '/icons/command.svg',
  compass: '/icons/compass-03 1.svg',
  cross: '/icons/cross.svg',
  cry: '/icons/cry.svg',
  dropdown: '/icons/dropdown.svg',
  filters: '/icons/filters.svg',
  heart: '/icons/heart.svg',
  home: '/icons/home.svg',
  info: '/icons/info.svg',
  logo: '/icons/logo.svg',
  plus: '/icons/plus.svg',
  'right-arrow': '/icons/right-arrow.svg',
  rightarrow: '/icons/rightarrow.svg',
  search: '/icons/search.svg',
  'search-placeholder': '/icons/search-placeholder.svg',
  setting: '/icons/setting.svg',
  star: '/icons/star.svg',
  thumbnail: '/icons/thumbnail.svg',
  'usa-flag': '/icons/usa-flag.svg',
  voices: '/icons/voices 1.svg',
  wave: '/icons/wave.svg',
}

/**
 * Icon Component
 * 
 * Centralized icon component with consistent sizing and styling.
 * 
 * @example
 * ```tsx
 * <Icon name="home" size={20} />
 * <Icon name="search" size={16} className="text-gray-400" />
 * ```
 */
export function Icon({ name, size = 20, className = '', alt, ...props }: IconProps) {
  const iconPath = iconPaths[name]
  
  if (!iconPath) {
    console.warn(`Icon "${name}" not found in registry`)
    return null
  }

  const sizeValue = typeof size === 'number' ? size : size
  const altText = alt || `${name} icon`

  return (
    <Image
      src={iconPath}
      alt={altText}
      width={sizeValue}
      height={sizeValue}
      className={className}
      {...props}
    />
  )
}

/**
 * Icon SVG Component (for inline SVGs)
 * 
 * Use this when you need to style the SVG directly or use it as a child.
 */
export function IconSVG({ name, size = 20, className = '', ...props }: Omit<IconProps, 'alt'>) {
  const iconPath = iconPaths[name]
  
  if (!iconPath) {
    console.warn(`Icon "${name}" not found in registry`)
    return null
  }

  // For SVG icons, we'll use a simple img tag that can be styled
  return (
    <img
      src={iconPath}
      alt=""
      width={size}
      height={size}
      className={className}
      {...props}
    />
  )
}

