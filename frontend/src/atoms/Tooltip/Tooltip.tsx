import * as React from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const tooltipVariants = cva(
  'pointer-events-none fixed z-50 inline-block rounded-md px-2 py-1 text-xs shadow-md opacity-0 transition-opacity',
  {
    variants: {
      intent: {
        primary: 'bg-neutral-800 text-white',
        secondary: 'bg-secondary text-secondary-foreground',
        tertiary: 'bg-tertiary text-tertiary-foreground',
        quaternary: 'bg-quaternary text-quaternary-foreground',
        success: 'bg-success text-success-foreground',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  },
);

const arrowVariants = cva('absolute w-2 h-2 rotate-45', {
  variants: {
    placement: {
      top: 'left-1/2 -translate-x-1/2 -bottom-1',
      bottom: 'left-1/2 -translate-x-1/2 -top-1',
      left: 'top-1/2 -translate-y-1/2 -right-1',
      right: 'top-1/2 -translate-y-1/2 -left-1',
    },
    intent: {
      primary: 'bg-neutral-800',
      secondary: 'bg-secondary',
      tertiary: 'bg-tertiary',
      quaternary: 'bg-quaternary',
      success: 'bg-success',
    },
  },
  defaultVariants: {
    placement: 'top',
    intent: 'primary',
  },
});

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  /** Tooltip text or content */
  content: React.ReactNode;
  /** Element that triggers the tooltip */
  children: React.ReactElement;
  /** Tooltip placement relative to the trigger */
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = ({
  children,
  content,
  placement = 'top',
  intent,
}: TooltipProps) => {
  const [open, setOpen] = React.useState(false);
  const [style, setStyle] = React.useState<React.CSSProperties>();
  const triggerRef = React.useRef<HTMLElement>(null);
  const id = React.useId();

  const updatePosition = React.useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const offset = 8;
    let top = 0;
    let left = 0;
    let transform = '';
    switch (placement) {
      case 'bottom':
        top = rect.bottom + offset;
        left = rect.left + rect.width / 2;
        transform = 'translate(-50%, 0)';
        break;
      case 'left':
        top = rect.top + rect.height / 2;
        left = rect.left - offset;
        transform = 'translate(-100%, -50%)';
        break;
      case 'right':
        top = rect.top + rect.height / 2;
        left = rect.right + offset;
        transform = 'translate(0, -50%)';
        break;
      default:
        top = rect.top - offset;
        left = rect.left + rect.width / 2;
        transform = 'translate(-50%, -100%)';
    }
    setStyle({ top, left, transform });
  }, [placement]);

  const show = () => {
    setOpen(true);
    updatePosition();
  };

  const hide = () => setOpen(false);

  React.useEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, updatePosition]);

  const child = React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: (e: React.MouseEvent) => {
      children.props.onMouseEnter?.(e);
      show();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      children.props.onMouseLeave?.(e);
      hide();
    },
    onFocus: (e: React.FocusEvent) => {
      children.props.onFocus?.(e);
      show();
    },
    onBlur: (e: React.FocusEvent) => {
      children.props.onBlur?.(e);
      hide();
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') hide();
      children.props.onKeyDown?.(e);
    },
    'aria-describedby': id,
  });

  return (
    <>
      {child}
      {open &&
        createPortal(
          <span
            role="tooltip"
            id={id}
            style={style}
            className={cn(tooltipVariants({ intent }), open ? 'opacity-100' : 'opacity-0')}
          >
            {content}
            <span className={cn(arrowVariants({ placement, intent }))} />
          </span>,
          document.body,
        )}
    </>
  );
};

Tooltip.displayName = 'Tooltip';

export { tooltipVariants };
