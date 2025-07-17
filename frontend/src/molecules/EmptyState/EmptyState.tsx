import * as React from 'react';
import { Icon, type IconName } from '@/atoms/Icon';
import { Heading } from '@/atoms/Heading';
import { Text } from '@/atoms/Text';
import { Button } from '@/atoms/Button/Button';
import { cn } from '@/lib/utils';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Name of the icon to display */
  iconName?: IconName;
  /** Main title for the empty state */
  title: string;
  /** Optional secondary message */
  message?: string;
  /** Label for the action button */
  actionLabel?: string;
  /** Hide the icon */
  hideIcon?: boolean;
  /** Click handler for the action button */
  onAction?: () => void;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      iconName = 'Folder',
      title,
      message,
      actionLabel,
      hideIcon = false,
      onAction,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center gap-4 py-12',
          className,
        )}
        {...props}
      >
        {!hideIcon && iconName && (
          <Icon
            name={iconName}
            className="w-16 h-16 text-muted-foreground"
            aria-hidden="true"
          />
        )}
        <Heading level={4}>{title}</Heading>
        {message && <Text muted>{message}</Text>}
        {actionLabel && (
          <Button onClick={onAction} intent="secondary">
            {actionLabel}
          </Button>
        )}
      </div>
    );
  },
);
EmptyState.displayName = 'EmptyState';

