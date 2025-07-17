import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Card } from '@/atoms/Card';
import { Text } from '@/atoms/Text';
import { Badge, type BadgeProps } from '@/atoms/Badge';
import { Icon } from '@/atoms/Icon';
import { Button } from '@/atoms/Button/Button';
import { MoreHorizontal } from 'lucide-react';

export type OrderStatus = 'Entregado' | 'Pendiente' | 'Cancelado' | 'En ruta';

const statusVariantMap: Record<OrderStatus, BadgeProps['variant']> = {
  Entregado: 'success',
  Pendiente: 'warning',
  Cancelado: 'destructive',
  'En ruta': 'info',
};

const orderItemVariants = cva('flex items-center gap-3 w-full', {
  variants: {
    clickable: {
      true: 'cursor-pointer hover:bg-muted',
    },
  },
});

export interface OrderItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Identifier of the order */
  orderId: string;
  /** Date of the order */
  date: string;
  /** Total amount */
  total: string;
  /** Status of the order */
  status: OrderStatus;
  /** Show the leading icon */
  showIcon?: boolean;
  /** Fired when the item is clicked */
  onSelect?: () => void;
  /** Fired when the action button is clicked */
  onActionClick?: () => void;
}

export const OrderItem = React.forwardRef<HTMLDivElement, OrderItemProps>(
  (
    {
      orderId,
      date,
      total,
      status,
      showIcon = false,
      onSelect,
      onActionClick,
      className,
      ...props
    },
    ref,
  ) => {
    const clickable = !!onSelect;
    const badgeVariant = statusVariantMap[status];

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!clickable) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect?.();
      }
    };

    const handleAction = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onActionClick?.();
    };

    return (
      <Card
        ref={ref}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={onSelect}
        onKeyDown={handleKeyDown}
        clickable={clickable}
        className={cn(orderItemVariants({ clickable }), className)}
        {...props}
      >
        {showIcon && (
          <Icon
            name="File"
            size="lg"
            aria-hidden="true"
            data-testid="order-icon"
            className="text-secondary"
          />
        )}
        <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center">
          <Text as="span" weight="semibold">
            {orderId}
          </Text>
          <Text as="span" muted>
            {date}
          </Text>
          <Text as="span" className="sm:ml-auto">
            {total}
          </Text>
        </div>
        <Badge variant={badgeVariant} className="ml-2 whitespace-nowrap">
          {status}
        </Badge>
        {onActionClick && (
          <Button
            variant="icon"
            intent="secondary"
            size="sm"
            aria-label="Acciones"
            onClick={handleAction}
            className="ml-2"
          >
            <MoreHorizontal size={16} />
          </Button>
        )}
      </Card>
    );
  },
);
OrderItem.displayName = 'OrderItem';

export { orderItemVariants };
