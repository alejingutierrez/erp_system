import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const spinnerVariants = cva('animate-spin rounded-full border-4 border-solid', {
  variants: {
    intent: {
      primary: 'border-b-transparent border-l-transparent',
      secondary: 'border-b-transparent border-l-transparent',
    },
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /** Screen reader label for accessibility */
  label?: string;
}

export function Spinner({ className, intent, size, label, ...props }: SpinnerProps) {
  return (
    <div role="status" className={cn(spinnerVariants({ intent, size }), className)} {...props}>
      <span className="sr-only">{label ?? 'Loading...'}</span>
    </div>
  );
}
