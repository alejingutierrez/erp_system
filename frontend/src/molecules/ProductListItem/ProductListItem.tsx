import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Avatar } from '@/atoms/Avatar';
import { Text } from '@/atoms/Text';
import { Button } from '@/atoms/Button/Button';
import { Icon } from '@/atoms/Icon';
import { Toast } from '@/atoms/Toast';

const itemVariants = cva('flex items-center gap-3 px-3 py-2 rounded-md group', {
  variants: {
    showActions: {
      true: 'justify-between',
      false: '',
    },
  },
  defaultVariants: {
    showActions: true,
  },
});

export interface ProductListItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof itemVariants> {
  id: string;
  img: string;
  name: string;
  price: number;
  currency?: string;
  onAdd?: () => void;
  onEdit?: () => void;
}

export const ProductListItem = React.forwardRef<HTMLLIElement, ProductListItemProps>(
  (
    {
      id,
      img,
      name,
      price,
      currency = 'USD',
      onAdd,
      onEdit,
      showActions,
      className,
      ...props
    },
    ref,
  ) => {
    const [toastVisible, setToastVisible] = React.useState(false);

    const handleAdd = (e: React.MouseEvent) => {
      e.stopPropagation();
      onAdd?.();
      setToastVisible(true);
    };

    const handleEdit = (e: React.MouseEvent) => {
      e.stopPropagation();
      onEdit?.();
    };

    const formatted = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency,
    }).format(price);

    return (
      <>
        {toastVisible && (
          <Toast intent="success" onDismiss={() => setToastVisible(false)}>
            Añadido
          </Toast>
        )}
        <li
          ref={ref}
          className={cn(itemVariants({ showActions }), className, 'hover:bg-muted')}
          {...props}
        >
          <Avatar src={img} alt={name} size="sm" className="shrink-0" />
          <div className="flex-1 overflow-hidden">
            <Text as="span" weight="medium" className="block truncate">
              {name}
            </Text>
            <Text as="span" weight="semibold" color="secondary">
              <data value={price}>{formatted}</data>
            </Text>
          </div>
          {showActions && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onEdit && (
                <Button
                  variant="icon"
                  size="sm"
                  intent="secondary"
                  aria-label="Editar"
                  onClick={handleEdit}
                >
                  <Icon name="Edit" />
                </Button>
              )}
              {onAdd && (
                <Button
                  variant="icon"
                  size="sm"
                  intent="primary"
                  aria-label="Añadir"
                  onClick={handleAdd}
                >
                  <Icon name="Plus" />
                </Button>
              )}
            </div>
          )}
        </li>
      </>
    );
  },
);
ProductListItem.displayName = 'ProductListItem';

export { itemVariants };
