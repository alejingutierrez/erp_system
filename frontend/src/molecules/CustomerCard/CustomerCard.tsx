import * as React from 'react';
import { Card } from '@/atoms/Card';
import { Avatar } from '@/atoms/Avatar';
import { Heading } from '@/atoms/Heading';
import { Text } from '@/atoms/Text';
import { Badge } from '@/atoms/Badge';
import { Button } from '@/atoms/Button/Button';
import { Icon } from '@/atoms/Icon';
import { cn } from '@/lib/utils';

type Nivel = 'VIP' | 'Frecuente' | 'Nuevo';

const nivelColorMap: Record<Nivel, React.ComponentProps<typeof Badge>['variant']> = {
  VIP: 'success',
  Frecuente: 'secondary',
  Nuevo: 'info',
};

export interface CustomerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Customer full name */
  nombre: string;
  /** Avatar image source */
  avatarSrc?: string;
  /** Secondary info like email */
  infoSecundaria?: string;
  /** Customer level badge */
  nivel?: Nivel;
  /** Show action icon */
  mostrarAccion?: boolean;
  /** Click handler for the card */
  onSelect?: () => void;
  /** Click handler for the action icon */
  onAction?: () => void;
}

export const CustomerCard = React.forwardRef<HTMLDivElement, CustomerCardProps>(
  (
    {
      nombre,
      avatarSrc,
      infoSecundaria,
      nivel,
      mostrarAccion = false,
      onSelect,
      onAction,
      className,
      ...props
    },
    ref,
  ) => {
    const handleAction = (e: React.MouseEvent) => {
      e.stopPropagation();
      onAction?.();
    };

    const clickable = typeof onSelect === 'function';

    return (
      <Card
        ref={ref}
        clickable={clickable}
        onClick={onSelect}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        className={cn('flex items-center gap-4', className)}
        {...props}
      >
        <Avatar src={avatarSrc} name={nombre} size="md" />
        <div className="flex-1 min-w-0">
          <Heading
            as="h3"
            level={6}
            className="flex items-center gap-2 font-semibold"
          >
            {nombre}
            {nivel && (
              <Badge variant={nivelColorMap[nivel]}>{nivel}</Badge>
            )}
          </Heading>
          {infoSecundaria && (
            <Text as="p" size="sm" muted className="truncate">
              {infoSecundaria}
            </Text>
          )}
        </div>
        {mostrarAccion && (
          <Button
            variant="icon"
            size="sm"
            intent="primary"
            aria-label="Ver detalles"
            onClick={handleAction}
          >
            <Icon name="ChevronRight" />
          </Button>
        )}
      </Card>
    );
  },
);
CustomerCard.displayName = 'CustomerCard';
