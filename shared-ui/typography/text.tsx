/**
 * Typography System - Text
 * 
 * Text component with size, weight, and color variants.
 */

'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs leading-[18px]',
      sm: 'text-sm leading-[20px]',
      base: 'text-base leading-snug',
      lg: 'text-lg',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      default: 'text-[#E4E6E8]',
      muted: 'text-[#898C92]',
      subtle: 'text-[#8B8F95]',
      disabled: 'text-[#5d6165]',
      warning: 'text-[#D89C3A]',
      error: 'text-[#ee0b37]',
      success: 'text-[#4ada6f]',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'normal',
    color: 'default',
  },
})

type TextElement = HTMLParagraphElement | HTMLSpanElement | HTMLDivElement | HTMLLabelElement | HTMLAnchorElement

type TextPropsBase = VariantProps<typeof textVariants> & {
  as?: 'p' | 'span' | 'div' | 'label' | 'a'
  truncate?: boolean
  lineClamp?: number
  children?: React.ReactNode
  className?: string
}

export type TextProps = TextPropsBase & 
  React.HTMLAttributes<HTMLElement> &
  Partial<React.AnchorHTMLAttributes<HTMLAnchorElement>>

const Text = React.forwardRef<TextElement, TextProps>(
  ({ className, size, weight, color, as = 'p', truncate, lineClamp, children, ...props }, ref) => {
    const Component = as
    return (
      <Component
        className={cn(
          textVariants({ size, weight, color }),
          truncate && 'truncate',
          lineClamp && `line-clamp-${lineClamp}`,
          className
        )}
        ref={ref as any}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Text.displayName = 'Text'

export { Text, textVariants }

