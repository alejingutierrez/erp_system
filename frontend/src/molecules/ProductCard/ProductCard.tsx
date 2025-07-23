import * as React from 'react';
import { Card } from '@/atoms/Card';
import { Heading } from '@/atoms/Heading';
import { Text } from '@/atoms/Text';
import { Badge } from '@/atoms/Badge';
import { Tag } from '@/atoms/Tag';
import { Button } from '@/atoms/Button/Button';
import { Icon } from '@/atoms/Icon';
import { cn } from '@/lib/utils';

export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  productName: string;
  price: string;
  imageSrc?: string;
  outOfStock?: boolean;
  onSale?: boolean;
  clickable?: boolean;
  statusBadge?: 'Nuevo' | 'Oferta' | 'Agotado' | null;
  showActions?: boolean;
  onAddToCart?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const defaultOnAddToCart = () => console.log('add to cart');
const defaultOnEdit = () => console.log('edit product');
const defaultOnDelete = () => console.log('delete product');

// Fallback image used when no product image is provided
const placeholderImg =
  'https://media.weekday.com/assets/003/cc/b0/ccb0a1481dbae44c573caf38fd53db8ca3e977ad_xl-1.jpg';

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      productName,
      price,
      imageSrc,
      outOfStock = false,
      onSale = false,
      clickable = true,
      statusBadge = null,
  showActions = false,
  onAddToCart,
  onEdit,
  onDelete,
      onClick,
      className,
      ...props
    },
    ref,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (clickable && onClick) {
        onClick();
      }
    };

    const imageClasses = cn('h-full w-full object-cover', outOfStock && 'opacity-50');

    const statusColor = statusBadge === 'Agotado'
      ? 'destructive'
      : statusBadge === 'Oferta'
      ? 'secondary'
      : 'success';

    return (
      <Card
        ref={ref}
        clickable={clickable}
        onClick={handleClick}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        className={cn('w-full max-w-xs space-y-2', className)}
        {...props}
      >
        <div className="relative overflow-hidden rounded-md aspect-[3/4]">
          <img
            src={imageSrc || placeholderImg}
            alt={productName}
            className={imageClasses}
          />
          {outOfStock && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              Sin stock
            </Badge>
          )}
          {onSale && (
            <Badge variant="info" className="absolute top-2 right-2">
              Oferta
            </Badge>
          )}
          {showActions && (
            <div className="absolute bottom-2 right-2 flex gap-1">
              <Button
                variant="icon"
                size="sm"
                intent="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  (onEdit ?? defaultOnEdit)();
                }}
              >
                <Icon name="Edit" />
              </Button>
              <Button
                variant="icon"
                size="sm"
                intent="tertiary"
                onClick={(e) => {
                  e.stopPropagation();
                  (onDelete ?? defaultOnDelete)();
                }}
              >
                <Icon name="Trash2" />
              </Button>
              <Button
                variant="icon"
                size="sm"
                intent="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  (onAddToCart ?? defaultOnAddToCart)();
                }}
              >
                <Icon name="Plus" />
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Heading
              level={4}
              className="text-sm leading-tight line-clamp-2"
            >
              {productName}
            </Heading>
            {statusBadge && (
              <Tag
                variant="solid"
                color={statusColor}
                className="mt-1 text-xs w-max"
              >
                {statusBadge}
              </Tag>
            )}
          </div>
          <Text
            as="span"
            weight="semibold"
            color="secondary"
            className="text-base shrink-0"
          >
            {price}
          </Text>
        </div>
      </Card>
    );
  },
);
ProductCard.displayName = 'ProductCard';


