import * as React from 'react';
import { cn } from '@/lib/utils';
import { TimelineItem } from '@/molecules/TimelineItem';
import type { IconName } from '@/atoms/Icon';

export interface Activity {
  id: string;
  date: Date;
  content: React.ReactNode;
  icon?: IconName;
}

export interface ActivityFeedProps extends React.HTMLAttributes<HTMLOListElement> {
  /** Array of activity items */
  items: Activity[];
}

const formatDate = (date: Date) =>
  `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getFullYear()}`;

const formatTime = (date: Date) =>
  `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;

export const ActivityFeed = React.forwardRef<HTMLOListElement, ActivityFeedProps>(
  ({ items, className, ...props }, ref) => {
    const sorted = React.useMemo(() => {
      return [...items].sort((a, b) => b.date.getTime() - a.date.getTime());
    }, [items]);

    const groups = React.useMemo(() => {
      const map = new Map<string, Activity[]>();
      for (const item of sorted) {
        const key = item.date.toDateString();
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(item);
      }
      return Array.from(map.entries());
    }, [sorted]);

    return (
      <ol
        ref={ref}
        className={cn('activity-feed space-y-8', className)}
        aria-label="Actividad reciente"
        {...props}
      >
        {groups.map(([day, acts]) => {
          const dayDate = new Date(day);
          return (
            <li key={day} className="space-y-4">
              <time
                dateTime={dayDate.toISOString().split('T')[0]}
                className="text-sm font-semibold text-muted-foreground"
              >
                {formatDate(dayDate)}
              </time>
              <ol className="mt-2 space-y-6">
                {acts.map((act) => (
                  <TimelineItem
                    key={act.id}
                    iconName={act.icon ?? 'Clock'}
                    title={act.content as any}
                    date={formatTime(act.date)}
                  />
                ))}
              </ol>
            </li>
          );
        })}
      </ol>
    );
  },
);
ActivityFeed.displayName = 'ActivityFeed';
