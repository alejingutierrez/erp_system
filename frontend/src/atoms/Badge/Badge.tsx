import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold',
  {
    variants: {
      variant: {
        neutral: 'bg-muted text-foreground',
        success: 'bg-success text-white',
        warning: 'bg-quaternary text-foreground',
        destructive: 'bg-tertiary text-white',
        info: 'bg-secondary text-foreground',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
    );
  },
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
