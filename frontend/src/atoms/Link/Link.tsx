import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const linkVariants = cva(
  'text-sm font-medium underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-background',
  {
    variants: {
      color: {
        primary: 'text-primary hover:text-primary/80',
        secondary: 'text-secondary hover:text-secondary/80',
        tertiary: 'text-tertiary hover:text-tertiary/80',
        quaternary: 'text-quaternary hover:text-quaternary/80',
        success: 'text-success hover:text-success/80',
      },
    },
    defaultVariants: {
      color: 'secondary',
    },
  },
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  /** If true, the link opens in a new tab */
  isExternal?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, color, isExternal, target, rel, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(linkVariants({ color }), className)}
        target={isExternal ? '_blank' : target}
        rel={isExternal ? 'noopener noreferrer' : rel}
        {...props}
      />
    );
  },
);
Link.displayName = 'Link';

export { Link, linkVariants };
