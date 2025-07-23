import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Card } from '@/atoms/Card';
import { Text } from '@/atoms/Text';
import { Badge, type BadgeProps } from '@/atoms/Badge';
import { Icon, type IconName, type IconProps } from '@/atoms/Icon';
import { MoreHorizontal } from 'lucide-react';
import { ActionMenu, type ActionMenuOption } from '@/molecules/ActionMenu';

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
  /** Name of the icon to display */
  iconName?: IconName;
  /** Color of the icon */
  iconColor?: IconProps['color'];
  /** Fired when the item is clicked */
  onSelect?: () => void;
  /** Options for the action menu */
  actionOptions?: ActionMenuOption[];
  /** Fired when an action is selected */
  onActionSelect?: (option: ActionMenuOption, index: number) => void;
}

export const OrderItem = React.forwardRef<HTMLDivElement, OrderItemProps>(
  (
    {
      orderId,
      date,
      total,
      status,
      showIcon = false,
      iconName = 'File',
      iconColor = 'secondary',
      onSelect,
      actionOptions,
      onActionSelect,
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
            name={iconName}
            size="lg"
            color={iconColor}
            aria-hidden="true"
            data-testid="order-icon"
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
        {actionOptions && actionOptions.length > 0 && (
          <ActionMenu
            options={actionOptions}
            onOptionSelect={onActionSelect}
            position="bottom-right"
            aria-label="Acciones"
            className="ml-2"
          >
            <MoreHorizontal size={16} />
          </ActionMenu>
        )}
      </Card>
    );
  },
);
OrderItem.displayName = 'OrderItem';

export { orderItemVariants };
