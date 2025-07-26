import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { StatCard, type StatCardProps } from '@/molecules/StatCard';
import { Divider } from '@/atoms/Divider';

const statsGroupVariants = cva('grid gap-4', {
  variants: {
    direction: {
      row: 'auto-cols-fr grid-flow-col',
      column: 'grid-flow-row',
      auto: 'grid-flow-row sm:auto-cols-fr sm:grid-flow-col',
    },
  },
  defaultVariants: {
    direction: 'row',
  },
});

export interface StatsGroupProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof statsGroupVariants> {
  /** Stat cards to render */
  stats: StatCardProps[];
  /** Show dividers between stats */
  withDividers?: boolean;
  /** Announce updates to assistive technologies */
  live?: boolean;
}

export const StatsGroup = React.forwardRef<HTMLElement, StatsGroupProps>(
  (
    {
      stats,
      direction,
      withDividers = false,
      live = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        aria-live={live ? 'polite' : undefined}
        className={cn('stats-group', statsGroupVariants({ direction }), className)}
        {...props}
      >
        {stats.map((stat, idx) => (
          <React.Fragment key={idx}>
            <StatCard {...stat} />
            {withDividers && idx < stats.length - 1 && (
              direction === 'row' ? (
                <Divider orientation="vertical" className="hidden sm:block" />
              ) : direction === 'column' ? (
                <Divider orientation="horizontal" />
              ) : (
                <>
                  <Divider orientation="horizontal" className="sm:hidden" />
                  <Divider orientation="vertical" className="hidden sm:block" />
                </>
              )
            )}
          </React.Fragment>
        ))}
      </section>
    );
  },
);
StatsGroup.displayName = 'StatsGroup';

export { statsGroupVariants };
