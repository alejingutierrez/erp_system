import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Text } from '@/atoms/Text';
import { Badge, type BadgeProps } from '@/atoms/Badge';
import { Icon } from '@/atoms/Icon';
import { ActionMenu, type ActionMenuOption } from '@/molecules/ActionMenu';

const orderListItemVariants = cva(
  'grid items-center gap-2 px-3 py-2 text-sm rounded-md',
  {
    variants: {
      clickable: {
        true: 'hover:bg-muted cursor-pointer',
        false: '',
      },
      showActions: {
        true: 'grid-cols-[auto_auto_1fr_auto_auto_auto]',
        false: 'grid-cols-[auto_auto_1fr_auto_auto]',
      },
    },
    defaultVariants: {
      clickable: true,
      showActions: false,
    },
  },
);

const statusColorMap: Record<string, BadgeProps['variant']> = {
  Pendiente: 'warning',
  Enviado: 'info',
  Entregado: 'success',
  Cancelado: 'destructive',
};

export interface OrderListItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof orderListItemVariants> {
  orderId: string;
  date: string;
  customerName: string;
  total: string;
  status: string;
  showActions?: boolean;
  /** Options for the action menu */
  actionOptions?: ActionMenuOption[];
  /** Called when a menu option is selected */
  onActionSelect?: (option: ActionMenuOption, index: number) => void;
  onStatusClick?: () => void;
}

export const OrderListItem = React.forwardRef<HTMLDivElement, OrderListItemProps>(
  (
    {
      orderId,
      date,
      customerName,
      total,
      status,
      showActions,
      clickable,
      className,
      onClick,
      onActionSelect,
      onStatusClick,
      actionOptions,
      ...props
    },
    ref,
  ) => {
    const statusVariant = statusColorMap[status] ?? 'neutral';

    const handleMenuSelect = (option: ActionMenuOption, index: number) => {
      onActionSelect?.(option, index);
    };

    const handleStatusClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onStatusClick?.();
    };

    return (
      <div
        ref={ref}
        className={cn(orderListItemVariants({ clickable, showActions }), className)}
        onClick={onClick}
        {...props}
      >
        <Text as="span" weight="semibold" className="w-20">
          #{orderId}
        </Text>
        <Text as="span" className="w-24 hidden sm:inline">
          {date}
        </Text>
        <Text as="span" className="truncate">
          {customerName}
        </Text>
        <Text as="span" weight="medium" className="w-24 text-right">
          {total}
        </Text>
        <Badge
          variant={statusVariant}
          onClick={onStatusClick ? handleStatusClick : undefined}
          className={cn(onStatusClick && 'cursor-pointer select-none')}
        >
          {status}
        </Badge>
        {showActions && actionOptions && actionOptions.length > 0 && (
          <ActionMenu
            aria-label="Acciones"
            options={actionOptions}
            onOptionSelect={handleMenuSelect}
            position="bottom-right"
            className="ml-1"
          >
            <Icon name="MoreHorizontal" />
          </ActionMenu>
        )}
      </div>
    );
  },
);
OrderListItem.displayName = 'OrderListItem';

export { orderListItemVariants };
