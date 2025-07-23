import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const trackVariants = cva(
  'bg-border rounded-full overflow-hidden flex-1',
  {
    variants: {
    size: {
      sm: 'h-1.5',
      md: 'h-2',
      lg: 'h-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const indicatorVariants = cva('h-full transition-[width] duration-300', {
  variants: {
    color: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      tertiary: 'bg-tertiary',
      quaternary: 'bg-quaternary',
      success: 'bg-success',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

const labelVariants = cva(
  'ml-2 px-2 py-0.5 text-xs font-medium rounded-full text-white',
  {
    variants: {
      color: {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        tertiary: 'bg-tertiary',
        quaternary: 'bg-quaternary',
        success: 'bg-success',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  },
);

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof trackVariants>,
    VariantProps<typeof indicatorVariants> {
  /** Percentage of completion (0-100). Omit for indeterminate state. */
  value?: number;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, size, color, value, ...props }, ref) => {
    const clamped = value === undefined ? undefined : Math.min(100, Math.max(0, value));
    const isIndeterminate = clamped === undefined;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={isIndeterminate ? undefined : clamped}
        className={cn('flex items-center', className)}
        {...props}
      >
        <div className={trackVariants({ size })}>
          {isIndeterminate ? (
            <div
              className={cn(
                indicatorVariants({ color }),
                'animate-indeterminate',
              )}
            />
          ) : (
            <div
              className={indicatorVariants({ color })}
              style={{ width: `${clamped}%` }}
            />
          )}
        </div>
        {!isIndeterminate && (
          <span className={labelVariants({ color })}>{clamped}%</span>
        )}
      </div>
    );
  },
);
ProgressBar.displayName = 'ProgressBar';

export { trackVariants as progressBarTrackVariants, indicatorVariants as progressBarIndicatorVariants };
