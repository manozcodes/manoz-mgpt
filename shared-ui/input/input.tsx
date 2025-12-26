'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'w-full bg-transparent outline-none transition-colors placeholder:text-[#8B8F95] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-[#E4E6E8]',
        search: 'text-[#E4E6E8]',
      },
      size: {
        sm: 'text-sm px-3 py-2',
        md: 'text-base px-4 py-3',
        lg: 'text-lg px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  error?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  noWrapper?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, error, leftIcon, rightIcon, noWrapper, ...props }, ref) => {
    const inputElement = (
      <input
        className={cn(
          inputVariants({ variant, size }),
          leftIcon && !noWrapper && 'pl-10',
          rightIcon && !noWrapper && 'pr-10',
          className
        )}
        ref={ref}
        {...props}
      />
    )

    if (noWrapper) {
      return inputElement
    }

    return (
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-[#8B8F95] pointer-events-none">
            {leftIcon}
          </span>
        )}
        {inputElement}
        {rightIcon && (
          <span className="absolute right-3 text-[#8B8F95] pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input, inputVariants }

