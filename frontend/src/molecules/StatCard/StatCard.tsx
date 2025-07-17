import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { Card, type CardProps } from '@/atoms/Card';
import { Icon, type IconName } from '@/atoms/Icon';
import { Text } from '@/atoms/Text';
import { cn } from '@/lib/utils';

const statCardVariants = cva('relative overflow-hidden', {
  variants: {
    orientation: {
      vertical: 'flex flex-col',
      horizontal: 'flex items-center gap-2',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

export interface StatCardProps
  extends Omit<CardProps, 'children'>,
    VariantProps<typeof statCardVariants> {
  /** Main numeric or textual value */
  value: string | number;
  /** Descriptive label for the metric */
  label: string;
  /** Optional icon name to display */
  iconName?: IconName;
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    { value, label, iconName, variant, clickable, orientation, className, ...props },
    ref,
  ) => {
    return (
      <Card
        ref={ref}
        variant={variant}
        clickable={clickable}
        className={cn(statCardVariants({ orientation }), className)}
        {...props}
      >
        {iconName && (
          <Icon
            name={iconName}
            className="absolute right-3 top-3 h-6 w-6 text-muted-foreground/50"
            aria-hidden="true"
          />
        )}
        <Text as="span" className="text-3xl font-semibold">
          {value}
        </Text>
        <Text as="span" className="text-sm text-muted-foreground">
          {label}
        </Text>
      </Card>
    );
  },
);
StatCard.displayName = 'StatCard';

export { statCardVariants };
