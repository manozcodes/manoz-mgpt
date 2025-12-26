'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const thumbnailVariants = cva(
  'relative shrink-0 overflow-hidden bg-[#212529]',
  {
    variants: {
      size: {
        xs: 'w-8 h-8',
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-24 h-24',
        xl: 'w-32 h-32',
      },
      shape: {
        square: 'rounded-lg',
        circle: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'square',
    },
  }
)

export interface ThumbnailProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>,
    VariantProps<typeof thumbnailVariants> {
  src?: string
  alt?: string
  fallback?: string
}

const Thumbnail = React.forwardRef<HTMLDivElement, ThumbnailProps>(
  ({ className, size, shape, src, alt, fallback = '/placeholder.svg', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(thumbnailVariants({ size, shape }), className)}
        {...props}
      >
        <Image
          src={src || fallback}
          alt={alt || 'Thumbnail'}
          fill
          className="object-cover"
        />
      </div>
    )
  }
)

Thumbnail.displayName = 'Thumbnail'

export { Thumbnail, thumbnailVariants }

