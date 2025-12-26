'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[#212529] text-[#E4E6E8]',
        primary: 'bg-[#3A3E43] text-[#E4E6E8]',
        success: 'bg-[#4ada6f] text-black',
        warning: 'bg-[#27231e] text-[#D89C3A] border border-[#D89C3A]',
        error: 'bg-[#27181e] text-[#ee0b37]',
        outline: 'border border-[#505458] text-[#b7bac0]',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  as?: 'div' | 'span'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, as = 'span', ...props }, ref) => {
    const Component = as
    return (
      <Component
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }

