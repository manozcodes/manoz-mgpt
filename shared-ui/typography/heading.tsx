'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const headingVariants = cva('text-[#E4E6E8] font-semibold', {
  variants: {
    level: {
      h1: 'text-3xl leading-tight',
      h2: 'text-lg leading-[18px] tracking-[0.01em]',
      h3: 'text-base font-medium',
      h4: 'text-sm font-medium',
      h5: 'text-xs font-medium',
      h6: 'text-xs font-medium',
    },
  },
  defaultVariants: {
    level: 'h2',
  },
})

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, as, children, ...props }, ref) => {
    const Component = as || level || 'h2'
    return (
      <Component
        className={cn(headingVariants({ level: level || (Component as any) }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Heading.displayName = 'Heading'

export { Heading, headingVariants }

