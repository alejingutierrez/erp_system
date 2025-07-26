import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Text } from '@/atoms/Text';
import { Input } from '@/atoms/Input';
import { Button } from '@/atoms/Button/Button';
import { Icon } from '@/atoms/Icon';
import { Toast } from '@/atoms/Toast';

const cartItemVariants = cva('grid items-center gap-2 py-2', {
  variants: {
    withImage: {
      true: 'grid-cols-[64px_1fr_auto_auto_auto]',
      false: 'grid-cols-[1fr_auto_auto_auto]',
    },
  },
  defaultVariants: {
    withImage: true,
  },
});

export interface CartItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cartItemVariants> {
  id: string;
  img?: string;
  name: string;
  price: number;
  quantity: number;
  onQtyChange: (q: number) => void;
  onRemove: () => void;
  currency?: string;
  stock?: number;
}

export const CartItem = React.forwardRef<HTMLDivElement, CartItemProps>(
  (
    {
      id,
      img,
      name,
      price,
      quantity,
      onQtyChange,
      onRemove,
      currency = '$',
      stock = Infinity,
      withImage,
      className,
      ...props
    },
    ref,
  ) => {
    const [showToast, setShowToast] = React.useState(false);

    const clamp = (val: number) => {
      if (val < 1) return 1;
      if (val > stock) return stock;
      return val;
    };

    const notifyStock = () => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    };

    const handleChange = (val: number) => {
      if (val > stock) {
        notifyStock();
        val = stock;
      }
      onQtyChange(clamp(val));
    };

    const increment = () => handleChange(quantity + 1);
    const decrement = () => handleChange(quantity - 1);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value, 10);
      if (!Number.isNaN(val)) handleChange(val);
    };

    const subtotal = (price * quantity).toFixed(2);

    return (
      <div
        ref={ref}
        className={cn(cartItemVariants({ withImage: withImage ?? !!img }), className)}
        {...props}
      >
        {img && (
          <img
            src={img}
            alt={name}
            className="h-16 w-16 object-cover rounded-md"
          />
        )}
        <Text as="span" className="truncate" weight="medium">
          {name}
        </Text>
        <div className="flex items-center gap-1">
          <Button
            variant="icon"
            size="sm"
            intent="secondary"
            aria-label="Quitar uno"
            onClick={decrement}
          >
            <Icon name="Minus" />
          </Button>
          <Input
            type="number"
            size="sm"
            value={quantity}
            onChange={handleInput}
            className="w-12 text-center"
          />
          <Button
            variant="icon"
            size="sm"
            intent="secondary"
            aria-label="Añadir uno"
            onClick={increment}
          >
            <Icon name="Plus" />
          </Button>
        </div>
        <Text as="span" weight="semibold" className="whitespace-nowrap">
          {currency}
          {subtotal}
        </Text>
        <Button
          variant="icon"
          size="sm"
          intent="tertiary"
          aria-label="Eliminar artículo"
          onClick={onRemove}
        >
          <Icon name="Trash2" />
        </Button>
        {showToast && (
          <Toast intent="error" onDismiss={() => setShowToast(false)}>
            Stock insuficiente
          </Toast>
        )}
      </div>
    );
  },
);
CartItem.displayName = 'CartItem';

export { cartItemVariants };
