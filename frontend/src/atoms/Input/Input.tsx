import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'block w-full rounded-md border border-border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'py-1 px-2 text-sm',
        md: 'py-2 px-3 text-base',
        lg: 'py-3 px-4 text-lg',
      },
      leftIcon: {
        true: 'pl-10',
      },
      rightIcon: {
        true: 'pr-10',
      },
      error: {
        true: 'border-destructive focus:ring-destructive',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<VariantProps<typeof inputVariants>, 'error' | 'leftIcon' | 'rightIcon'> {
  LeftIcon?: React.ElementType;
  RightIcon?: React.ElementType;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, size, LeftIcon, RightIcon, error, ...props },
    ref
  ) => {
    const iconSize = size === 'lg' ? 20 : size === 'md' ? 18 : 16;
    const hasLeft = Boolean(LeftIcon);
    const hasRight = Boolean(RightIcon);

    return (
      <div className="relative">
        {LeftIcon && (
          <LeftIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            size={iconSize}
          />
        )}
        <input
          type="text"
          ref={ref}
          aria-invalid={error ? 'true' : undefined}
          className={cn(
            inputVariants({
              size,
              error,
              leftIcon: hasLeft,
              rightIcon: hasRight,
              className,
            })
          )}
          {...props}
        />
        {RightIcon && (
          <RightIcon
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
            size={iconSize}
          />
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { inputVariants };
