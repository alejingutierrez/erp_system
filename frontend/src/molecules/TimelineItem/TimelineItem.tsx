import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Icon, type IconName } from '@/atoms/Icon';
import { Heading } from '@/atoms/Heading';
import { Text } from '@/atoms/Text';

const indicatorVariants = cva(
  'absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full border-2 bg-background',
  {
    variants: {
      color: {
        primary: 'border-primary text-primary',
        secondary: 'border-secondary text-secondary',
        tertiary: 'border-tertiary text-tertiary',
        quaternary: 'border-quaternary text-quaternary',
        success: 'border-success text-success',
        destructive: 'border-destructive text-destructive',
      },
    },
    defaultVariants: { color: 'primary' },
  },
);

export interface TimelineItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof indicatorVariants> {
  /** Short title describing the event */
  title: string;
  /** Additional detail about the event */
  description?: string;
  /** Date or time string associated with the event */
  date?: string;
  /** Icon representing the event */
  iconName: IconName;
}

export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ title, description, date, iconName, color, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex gap-4 pl-9 pb-6 last:pb-0 after:absolute after:left-3 after:top-6 after:bottom-0 after:w-px after:bg-border after:content-[""] last:after:hidden',
          className,
        )}
        {...props}
      >
        <span data-testid="indicator" className={indicatorVariants({ color })}>
          <Icon name={iconName} size="sm" aria-hidden="true" />
        </span>
        <div className="flex-1 space-y-1">
          <div className="flex items-baseline justify-between">
            <Heading level={6} as="h3" className="font-semibold">
              {title}
            </Heading>
            {date && (
              <Text as="span" size="sm" muted className="ml-2 whitespace-nowrap">
                {date}
              </Text>
            )}
          </div>
          {description && (
            <Text as="p" size="sm">
              {description}
            </Text>
          )}
        </div>
      </div>
    );
  },
);
TimelineItem.displayName = 'TimelineItem';

export { indicatorVariants as timelineIndicatorVariants };
