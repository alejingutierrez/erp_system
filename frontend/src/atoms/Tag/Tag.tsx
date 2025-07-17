import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

const tagVariants = cva(
  'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        outline: 'bg-transparent',
        solid: '',
      },
      color: {
        primary: '',
        secondary: '',
        tertiary: '',
        quaternary: '',
        success: '',
        destructive: '',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        color: 'primary',
        className: 'bg-primary text-primary-foreground border-transparent',
      },
      {
        variant: 'solid',
        color: 'secondary',
        className: 'bg-secondary text-secondary-foreground border-transparent',
      },
      {
        variant: 'solid',
        color: 'tertiary',
        className: 'bg-tertiary text-tertiary-foreground border-transparent',
      },
      {
        variant: 'solid',
        color: 'quaternary',
        className: 'bg-quaternary text-quaternary-foreground border-transparent',
      },
      {
        variant: 'solid',
        color: 'success',
        className: 'bg-success text-success-foreground border-transparent',
      },
      {
        variant: 'solid',
        color: 'destructive',
        className: 'bg-destructive text-destructive-foreground border-transparent',
      },
      { variant: 'outline', color: 'primary', className: 'text-primary border-primary' },
      {
        variant: 'outline',
        color: 'secondary',
        className: 'text-secondary border-secondary',
      },
      { variant: 'outline', color: 'tertiary', className: 'text-tertiary border-tertiary' },
      {
        variant: 'outline',
        color: 'quaternary',
        className: 'text-quaternary border-quaternary',
      },
      { variant: 'outline', color: 'success', className: 'text-success border-success' },
      {
        variant: 'outline',
        color: 'destructive',
        className: 'text-destructive border-destructive',
      },
    ],
    defaultVariants: {
      variant: 'outline',
      color: 'primary',
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  /** Show a close button to remove the tag */
  closable?: boolean;
  /** Callback when the close button is clicked */
  onRemove?: () => void;
  /** Accessible label for the close button */
  removeLabel?: string;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant,
      color,
      closable = false,
      onRemove,
      removeLabel,
      children,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(true);

    if (!visible) {
      return null;
    }

    const handleRemove = () => {
      onRemove?.();
      setVisible(false);
    };

    return (
      <span ref={ref} className={cn(tagVariants({ variant, color }), className)} {...props}>
        {children}
        {closable && (
          <button
            type="button"
            onClick={handleRemove}
            aria-label={removeLabel ?? 'Quitar etiqueta'}
            className="ml-1 flex h-4 w-4 items-center justify-center rounded-full hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    );
  }
);
Tag.displayName = 'Tag';

export { tagVariants };
