import * as React from 'react';
import { cn } from '@/lib/utils';
import { Breadcrumbs, type BreadcrumbItem } from '@/atoms/Breadcrumbs';
import { Heading } from '@/atoms/Heading';
import { Icon, type IconName } from '@/atoms/Icon';
import { Divider } from '@/atoms/Divider';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Main title content */
  title: React.ReactNode;
  /** Breadcrumb navigation items */
  breadcrumbs?: BreadcrumbItem[];
  /** Secondary action elements */
  actions?: React.ReactNode;
  /** Optional icon to show next to title */
  icon?: IconName;
  /** Render divider below header */
  divider?: boolean;
}

export const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  (
    { title, breadcrumbs, actions, icon, divider = false, className, ...props },
    ref,
  ) => {
    return (
      <header
        ref={ref}
        className={cn('page-header space-y-2', className)}
        {...props}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} className="mb-1" />
        )}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="title-group flex items-center gap-2">
            {icon && <Icon name={icon} className="h-6 w-6 text-muted-foreground" aria-hidden="true" />}
            <Heading level={2}>{title}</Heading>
          </div>
          {actions && <div className="actions flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
        {divider && <Divider className="mt-2" />}
      </header>
    );
  },
);
PageHeader.displayName = 'PageHeader';

export default PageHeader;
