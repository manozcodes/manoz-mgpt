'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Heading } from '../typography'
import { Text } from '../typography'

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center justify-center text-center py-12 px-4', className)}
        {...props}
      >
        {icon && <div className="mb-4">{icon}</div>}
        <Heading level="h3" className="mb-2">
          {title}
        </Heading>
        {description && (
          <Text size="sm" color="muted" className="max-w-md mb-6">
            {description}
          </Text>
        )}
        {action && <div>{action}</div>}
      </div>
    )
  }
)

EmptyState.displayName = 'EmptyState'

export { EmptyState }

