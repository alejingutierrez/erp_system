import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/atoms/Card';
import { Badge } from '@/atoms/Badge';
import { Text } from '@/atoms/Text';
import { Icon } from '@/atoms/Icon';
import {
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
} from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  type?: 'info' | 'success' | 'warning' | 'destructive';
}

export interface NotificationListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of notifications */
  notifications?: Notification[];
  /** Maximum number of items visible before scrolling */
  maxVisible?: number;
  /** Called when a notification is clicked */
  onItemClick?: (notification: Notification) => void;
}


export const NotificationList = React.forwardRef<HTMLDivElement, NotificationListProps>(
  (
    { notifications = [], maxVisible, onItemClick, className, ...props },
    ref,
  ) => {
    const [items, setItems] = React.useState<Notification[]>([]);

    React.useEffect(() => {
      const sorted = [...notifications].sort(
        (a, b) => b.date.getTime() - a.date.getTime(),
      );
      setItems(sorted);
    }, [notifications]);

    const markAsRead = (id: string) => {
      setItems((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
    };

    const handleItemClick = (n: Notification) => {
      markAsRead(n.id);
      onItemClick?.(n);
    };

    const handleMarkAll = () => {
      setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const listStyle = React.useMemo(() => {
      if (!maxVisible || items.length <= maxVisible) return undefined;
      const itemHeight = 80; // approximate
      return { maxHeight: itemHeight * maxVisible } as React.CSSProperties;
    }, [maxVisible, items.length]);

    if (items.length === 0) {
      return (
        <div ref={ref} className={cn('p-4 text-center', className)} {...props}>
          <Text muted>No hay notificaciones</Text>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        <button
          type="button"
          onClick={handleMarkAll}
          className="ml-auto mb-1 text-sm underline"
        >
          Marcar todo como leído
        </button>
        <ul
          role="list"
          className="notification-list space-y-2 overflow-y-auto"
          style={listStyle}
        >
          {items.map((n) => {
            const iconEl =
              n.type === 'success' ? (
                <CheckCircle2 />
              ) : n.type === 'warning' ? (
                <AlertTriangle />
              ) : n.type === 'destructive' ? (
                <AlertCircle />
              ) : (
                <Info />
              );
            return (
              <li key={n.id} role="listitem" className="notification-item">
                <Card
                  role="button"
                  tabIndex={0}
                  onClick={() => handleItemClick(n)}
                  className="flex items-start gap-3 cursor-pointer"
                >
                  <Icon aria-label={n.type ?? 'info'}>{iconEl}</Icon>
                  <div className="flex-1">
                    <Text as="span" weight="semibold">
                      {n.title}
                    </Text>
                    <Text as="p" size="sm">
                      {n.message}
                    </Text>
                    <Text as="span" size="xs" muted>
                      {n.date.toLocaleString()}
                    </Text>
                  </div>
                  {!n.read && (
                    <Badge variant="info" className="ml-2 whitespace-nowrap">
                      Nuevo
                    </Badge>
                  )}
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
);
NotificationList.displayName = 'NotificationList';

