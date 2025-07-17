import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Icon, type IconName } from '@/atoms/Icon';
import { Text } from '@/atoms/Text';
import { Badge } from '@/atoms/Badge';

const navItemVariants = cva(
  'flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
  {
    variants: {
      active: {
        true: 'bg-primary text-primary-foreground font-semibold',
        false: 'text-foreground hover:bg-muted',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export interface NavItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navItemVariants> {
  /** Name of the icon to display */
  iconName: IconName;
  /** Label for the navigation item */
  label: string;
  /** Show badge with count */
  showBadge?: boolean;
  /** Number to display inside badge */
  badgeCount?: number;
}

export const NavItem = React.forwardRef<HTMLButtonElement, NavItemProps>(
  (
    { iconName, label, active, showBadge, badgeCount = 0, className, ...props },
    ref,
  ) => {
    const showBadgeFinal = showBadge && badgeCount > 0;

    return (
      <button
        type="button"
        ref={ref}
        className={cn(navItemVariants({ active }), className)}
        {...props}
      >
        <Icon name={iconName} size="md" aria-hidden="true" />
        <Text as="span" className="flex-1 text-left">
          {label}
        </Text>
        {showBadgeFinal && (
          <Badge variant="info" className="ml-auto">
            {badgeCount}
          </Badge>
        )}
      </button>
    );
  },
);
NavItem.displayName = 'NavItem';

export { navItemVariants };
