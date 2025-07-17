import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const dividerVariants = cva('', {
  variants: {
    orientation: {
      horizontal: 'w-full border-t',
      vertical: 'self-stretch w-px border-l',
    },
    spacing: {
      none: '',
      sm: '',
      md: '',
      lg: '',
    },
    color: {
      default: 'border-neutral-400',
      primary: 'border-primary',
      secondary: 'border-secondary',
      tertiary: 'border-tertiary',
      quaternary: 'border-quaternary',
      success: 'border-success',
      destructive: 'border-destructive',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', spacing: 'sm', className: 'my-1' },
    { orientation: 'horizontal', spacing: 'md', className: 'my-3' },
    { orientation: 'horizontal', spacing: 'lg', className: 'my-6' },
    { orientation: 'vertical', spacing: 'sm', className: 'mx-1' },
    { orientation: 'vertical', spacing: 'md', className: 'mx-3' },
    { orientation: 'vertical', spacing: 'lg', className: 'mx-6' },
    { color: 'quaternary', className: 'border-2' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    spacing: 'md',
    color: 'default',
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLHRElement>,
    VariantProps<typeof dividerVariants> {}

export const Divider = React.forwardRef<HTMLElement, DividerProps>(
  ({ orientation, spacing, color, className, ...props }, ref) => {
    const classes = cn(dividerVariants({ orientation, spacing, color }), className);
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role="separator"
          aria-orientation="vertical"
          className={classes}
          {...props}
        />
      );
    }
    return (
      <hr
        ref={ref as React.Ref<HTMLHRElement>}
        role="separator"
        className={classes}
        {...props}
      />
    );
  },
);
Divider.displayName = 'Divider';

export { dividerVariants };
