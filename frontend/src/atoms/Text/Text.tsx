import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textVariants = cva('font-sans', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-lg',
      lg: 'text-xl',
    },
    weight: {
      normal: 'font-normal',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      tertiary: 'text-tertiary',
      quaternary: 'text-quaternary',
      success: 'text-success',
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'normal',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  /** Render as a different element */
  as?: React.ElementType;
  /** Apply muted foreground color */
  muted?: boolean;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    { as: Tag = 'p', className, size, weight, color, muted, ...props },
    ref,
  ) => {
    const Component = Tag as keyof JSX.IntrinsicElements;
    return (
      <Component
        ref={ref}
        className={cn(
          textVariants({ size, weight, color }),
          muted && 'text-muted-foreground',
          className,
        )}
        {...props}
      />
    );
  },
);
Text.displayName = 'Text';

export { textVariants };
