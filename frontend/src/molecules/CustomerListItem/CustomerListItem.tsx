import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Avatar } from '@/atoms/Avatar';
import { Text } from '@/atoms/Text';
import { Badge } from '@/atoms/Badge';
import { Tag } from '@/atoms/Tag';
import { Button } from '@/atoms/Button/Button';
import { Icon } from '@/atoms/Icon';
import { Card } from '@/atoms/Card';
import {
  ActionMenu,
  type ActionMenuOption,
} from '@/molecules/ActionMenu';

const itemVariants = cva(
  'flex items-center w-full rounded-md px-4 py-2 gap-3 text-sm',
  {
    variants: {
      clickable: {
        true: 'cursor-pointer hover:bg-muted',
      },
    },
    defaultVariants: {
      clickable: false,
    },
  },
);

export interface CustomerListItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemVariants> {
  /** Full name of the customer */
  customerName: string;
  /** Email address */
  email: string;
  /** Phone number */
  phone?: string;
  /** Number of purchases */
  purchasesCount?: number;
  /** Category label */
  category?: string;
  /** Active state */
  active?: boolean;
  /** Show action menu */
  showActions?: boolean;
  /** Custom options for the action menu */
  actionMenuOptions?: ActionMenuOption[];
  /** Called when a menu option is selected */
  onMenuOptionSelect?: (option: ActionMenuOption, index: number) => void;
  /** Click handler for the whole row */
  onClick?: () => void;
  /** Edit action */
  onEdit?: () => void;
  /** Contact action */
  onContact?: () => void;
}

export const CustomerListItem = React.forwardRef<HTMLDivElement, CustomerListItemProps>(
  (
    {
      customerName,
      email,
      phone,
      purchasesCount,
      category,
      active = true,
      showActions = false,
      actionMenuOptions,
      onMenuOptionSelect,
      className,
      clickable,
      onClick,
      onEdit,
      onContact,
      ...props
    },
    ref,
  ) => {
    return (
      <Card
        ref={ref}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        clickable={clickable ?? !!onClick}
        className={cn(itemVariants({ clickable: false }), className)}
        {...props}
      >
        <Avatar name={customerName} size="sm" className={!active ? 'opacity-50' : undefined} />
        <div className="flex flex-col flex-1 text-left">
          <Text as="span" weight="medium">
            {customerName}
          </Text>
          <Text as="span" size="sm" muted>
            {email}
            {phone ? ` \u00B7 ${phone}` : ''}
          </Text>
        </div>
        {typeof purchasesCount !== 'undefined' && (
          <Text as="span" size="sm" muted className="whitespace-nowrap">
            {purchasesCount} compras
          </Text>
        )}
        {category && (
          <Tag variant="solid" color="secondary" className="ml-2 whitespace-nowrap">
            {category}
          </Tag>
        )}
        {typeof active === 'boolean' && (
          <Badge
            variant={active ? 'success' : 'destructive'}
            className="ml-2 whitespace-nowrap"
          >
            {active ? 'Activo' : 'Inactivo'}
          </Badge>
        )}
        {showActions && (
          <div className="ml-2 flex items-center gap-1">
            <ActionMenu
              aria-label="Más acciones"
              options={[
                ...(actionMenuOptions ?? []),
                ...(onContact ? [{ label: 'Contactar', iconName: 'Mail', value: 'contact' }] : []),
                ...(onEdit ? [{ label: 'Editar', iconName: 'Edit', value: 'edit' }] : []),
              ]}
              onOptionSelect={(option, index) => {
                if (option.value === 'edit') {
                  onEdit?.();
                } else if (option.value === 'contact') {
                  onContact?.();
                }
                onMenuOptionSelect?.(option, index);
              }}
            >
              <Icon name="MoreHorizontal" />
            </ActionMenu>
          </div>
        )}
      </Card>
    );
  },
);
CustomerListItem.displayName = 'CustomerListItem';

export { itemVariants };
