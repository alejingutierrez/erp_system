import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { Card, type CardProps } from '@/atoms/Card';
import { Heading } from '@/atoms/Heading';
import { Text } from '@/atoms/Text';
import { Icon, type IconName } from '@/atoms/Icon';
import { cn } from '@/lib/utils';

const widgetVariants = cva('dashboard-widget transition-shadow', {
  variants: {
    variant: {
      default: 'border-border',
      danger: 'border-destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface DashboardWidgetProps
  extends Omit<CardProps, 'children'>,
    VariantProps<typeof widgetVariants> {
  /** Title displayed at the top */
  title: string;
  /** Main numeric or textual value */
  value: string | number;
  /** Small caption under the chart */
  subLabel?: string;
  /** Optional icon to show when no chart is provided */
  iconName?: IconName;
  /** Optional mini chart element */
  chart?: React.ReactNode;
}

export const DashboardWidget = React.forwardRef<HTMLDivElement, DashboardWidgetProps>(
  (
    { title, value, subLabel, iconName, chart, variant, className, ...props },
    ref,
  ) => {
    const valueId = React.useId();
    return (
      <Card
        ref={ref}
        role="figure"
        aria-describedby={valueId}
        variant="outline"
        className={cn(
          'flex flex-col items-start gap-1 hover:shadow-md',
          widgetVariants({ variant }),
          className,
        )}
        {...props}
      >
        <Heading level={6} as="h3" className="font-semibold">
          {title}
        </Heading>
        <Text id={valueId} as="span" className="text-3xl font-semibold">
          {value}
        </Text>
        {chart ? (
          <div className="w-full" data-testid="chart">
            {chart}
          </div>
        ) : (
          iconName && (
            <Icon name={iconName} className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          )
        )}
        {subLabel && (
          <Text as="span" size="sm" muted>
            {subLabel}
          </Text>
        )}
      </Card>
    );
  },
);
DashboardWidget.displayName = 'DashboardWidget';

export { widgetVariants as dashboardWidgetVariants };
