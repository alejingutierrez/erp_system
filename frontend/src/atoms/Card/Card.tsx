import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-md border border-border bg-white p-4 text-foreground transition-shadow',
  {
    variants: {
      variant: {
        shadow: 'shadow-md',
        outline: 'shadow-none',
        glass: 'bg-surface-glass/80 backdrop-blur-md border-white/20 shadow-glass',
      },
      clickable: {
        true: 'cursor-pointer hover:shadow-lg',
      },
    },
    defaultVariants: {
      variant: 'shadow',
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  clickable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, clickable, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, clickable, className }))}
        {...props}
      />
    );
  },
);
Card.displayName = 'Card';

export { cardVariants };
