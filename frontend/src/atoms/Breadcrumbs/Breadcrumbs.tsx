import * as React from 'react';
import { Link, LinkProps } from '@/atoms/Link/Link';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
}

export interface BreadcrumbsProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Items to render in the breadcrumb trail */
  items: BreadcrumbItem[];
  /** Separator symbol between items */
  separator?: React.ReactNode;
  /** Color variant for the links */
  color?: LinkProps['color'];
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, separator = '/', className, color = 'secondary', ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('text-sm', className)}
        {...props}
      >
        <ol className="flex flex-wrap items-center">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center">
                {item.href && !isLast ? (
                  <Link href={item.href} color={color} className="whitespace-nowrap">
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="font-medium text-foreground whitespace-nowrap"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span className="mx-2 text-muted-foreground">{separator}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);
Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;
