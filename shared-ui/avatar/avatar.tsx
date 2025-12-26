'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const avatarVariants = cva(
  'relative flex items-center justify-center shrink-0 font-medium text-[#e5e6e8] bg-black overflow-hidden',
  {
    variants: {
      size: {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-16 h-16 text-2xl',
        '2xl': 'w-20 h-20 text-3xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-lg',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
    },
  }
)

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string | React.ReactNode
  name?: string
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, shape, src, alt, fallback, name, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false)
    
    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    const displayFallback = imgError || !src
    const fallbackContent = fallback || (name ? getInitials(name) : '?')

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, shape }), className)}
        {...props}
      >
        {displayFallback ? (
          typeof fallbackContent === 'string' ? (
            <span className="leading-none">{fallbackContent}</span>
          ) : (
            fallbackContent
          )
        ) : (
          <Image
            src={src!}
            alt={alt || name || 'Avatar'}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export { Avatar, avatarVariants }

