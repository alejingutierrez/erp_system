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

// Realistic unsplash photo used as fallback image
const placeholderImg =
  'https://images.unsplash.com/photo-1513708926704-99d6fa04d638?auto=format&fit=crop&w=600&q=60';

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
        className={cn('w-full space-y-2', className)}
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
              {onEdit && (
                <Button
                  variant="icon"
                  size="sm"
                  intent="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                >
                  <Icon name="Edit" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="icon"
                  size="sm"
                  intent="tertiary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                >
                  <Icon name="Trash2" />
                </Button>
              )}
              {onAddToCart && (
                <Button
                  variant="icon"
                  size="sm"
                  intent="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart();
                  }}
                >
                  <Icon name="Plus" />
                </Button>
              )}
            </div>
          )}
        </div>
        <div className="flex items-start justify-between gap-2">
          <Heading level={4} className="flex-1 text-sm truncate flex items-center gap-2">
            {productName}
            {statusBadge && (
              <Tag variant="solid" color={statusColor} className="text-xs">
                {statusBadge}
              </Tag>
            )}
          </Heading>
          <Text as="span" weight="semibold" color="secondary" className="text-base">
            {price}
          </Text>
        </div>
      </Card>
    );
  },
);
ProductCard.displayName = 'ProductCard';


