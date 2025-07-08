import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const headingVariants = cva('font-heading', {
  variants: {
    level: {
      '1': 'text-5xl font-bold tracking-tight',
      '2': 'text-4xl font-semibold tracking-tight',
      '3': 'text-3xl font-semibold tracking-tight',
      '4': 'text-2xl font-semibold tracking-tight',
      '5': 'text-xl font-semibold tracking-tight',
      '6': 'text-lg font-semibold tracking-tight',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
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
    level: '1',
    align: 'left',
    color: 'primary',
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    Omit<VariantProps<typeof headingVariants>, 'level'> {
  /** Visual and semantic level (1-6). */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Override the rendered element. */
  as?: React.ElementType;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 1, align, color, as: Tag, ...props }, ref) => {
    const Component = Tag || (`h${level}` as keyof JSX.IntrinsicElements);
    const variantLevel = String(level) as VariantProps<typeof headingVariants>['level'];
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level: variantLevel, align, color }), className)}
        {...props}
      />
    );
  },
);
Heading.displayName = 'Heading';

export { Heading, headingVariants };
