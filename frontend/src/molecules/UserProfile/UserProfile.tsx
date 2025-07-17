import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Avatar } from '@/atoms/Avatar';
import { Text } from '@/atoms/Text';
import { Icon } from '@/atoms/Icon';

const userProfileVariants = cva(
  'inline-flex items-center gap-2 rounded-md px-2 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
  {
    variants: {
      hoverable: {
        true: 'hover:bg-muted',
        false: '',
      },
    },
    defaultVariants: {
      hoverable: true,
    },
  },
);

export interface UserProfileProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof userProfileVariants> {
  /** User name to display */
  userName: string;
  /** Avatar image url */
  avatarSrc?: string | null;
  /** Show dropdown indicator icon */
  showDropdownIcon?: boolean;
  /** Optional user status indicator */
  status?: 'online' | 'offline' | 'away';
}

export const UserProfile = React.forwardRef<HTMLButtonElement, UserProfileProps>(
  (
    { userName, avatarSrc, showDropdownIcon = false, status, hoverable, className, ...props },
    ref,
  ) => {
    const statusColor =
      status === 'online'
        ? 'bg-success'
        : status === 'away'
          ? 'bg-quaternary'
          : status === 'offline'
            ? 'bg-muted'
            : undefined;

    return (
      <button
        ref={ref}
        type="button"
        className={cn(userProfileVariants({ hoverable }), className)}
        {...props}
      >
        <span className="relative inline-block">
          <Avatar src={avatarSrc ?? undefined} size="sm" name={userName} />
          {statusColor && (
            <span
              className={cn(
                'absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-1 ring-background',
                statusColor,
              )}
            />
          )}
        </span>
        <Text as="span" className="max-w-[8rem] truncate">
          {userName}
        </Text>
        {showDropdownIcon && <Icon name="ChevronDown" aria-hidden="true" />}
      </button>
    );
  },
);
UserProfile.displayName = 'UserProfile';

export { userProfileVariants };
