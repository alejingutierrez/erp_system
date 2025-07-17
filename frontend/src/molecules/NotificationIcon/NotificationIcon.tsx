import * as React from 'react';
import { cn } from '@/lib/utils';
import { Icon, type IconName } from '@/atoms/Icon';
import { Badge, type BadgeProps } from '@/atoms/Badge';

export interface NotificationIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Number of unread notifications */
  count?: number;
  /** Icon name to display */
  iconName?: IconName;
  /** Badge color variant */
  color?: BadgeProps['variant'];
  /** Size of the icon */
  size?: 'sm' | 'md' | 'lg';
}

export const NotificationIcon = React.forwardRef<HTMLButtonElement, NotificationIconProps>(
  (
    { count = 0, iconName = 'Bell', color = 'destructive', size = 'md', className, ...props },
    ref,
  ) => {
    const showBadge = count > 0;
    const displayCount = count > 99 ? '99+' : String(count);

    return (
      <button
        type="button"
        ref={ref}
        className={cn('relative inline-flex', className)}
        {...props}
      >
        <Icon name={iconName} size={size} aria-hidden="true" />
        {showBadge && (
          <Badge
            variant={color}
            className="absolute -top-1 -right-1 rounded-full px-1 py-0 text-[10px]"
          >
            {displayCount}
          </Badge>
        )}
      </button>
    );
  },
);
NotificationIcon.displayName = 'NotificationIcon';
