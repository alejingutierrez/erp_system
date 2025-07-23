import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { Card, type CardProps } from '@/atoms/Card';
import { Icon, type IconName } from '@/atoms/Icon';
import { ProgressBar } from '@/atoms/ProgressBar';
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
  /** Show an arrow indicating trend direction */
  trend?: 'up' | 'down';
  /** Optional value to display next to the trend arrow */
  trendValue?: string | number;
  /** Progress percentage to visualize with a bar */
  progress?: number;
  /** Data points for a small sparkline graph */
  sparklineData?: number[];
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      value,
      label,
      iconName,
      trend,
      trendValue,
      progress,
      sparklineData,
      variant,
      clickable,
      orientation,
      className,
      ...props
    },
    ref,
  ) => {
    const renderSparkline = (data?: number[]) => {
      if (!data || data.length < 2) return null;
      const w = 64;
      const h = 24;
      const min = Math.min(...data);
      const max = Math.max(...data);
      const range = max - min || 1;
      const points = data
        .map((d, i) => {
          const x = (i / (data.length - 1)) * w;
          const y = h - ((d - min) / range) * h;
          return `${x},${y}`;
        })
        .join(' ');
      return (
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="mt-2 h-6 w-full stroke-muted-foreground"
          fill="none"
        >
          <polyline points={points} strokeWidth={1.5} />
        </svg>
      );
    };

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
        <span className="flex items-center gap-1">
          <Text as="span" className="text-3xl font-semibold">
            {value}
          </Text>
          {trend && (
            <Icon
              name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'}
              className={cn(
                'h-4 w-4',
                trend === 'up' ? 'text-success' : 'text-destructive',
              )}
              aria-hidden="true"
            />
          )}
          {trendValue && (
            <Text as="span" className="text-xs text-muted-foreground">
              {trendValue}
            </Text>
          )}
        </span>
        <Text as="span" className="text-sm text-muted-foreground">
          {label}
        </Text>
        {renderSparkline(sparklineData)}
        {progress !== undefined && (
          <ProgressBar value={progress} size="sm" className="mt-2" />
        )}
      </Card>
    );
  },
);
StatCard.displayName = 'StatCard';

export { statCardVariants };
