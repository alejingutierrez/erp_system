import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const tooltipVariants = cva(
  'absolute z-50 inline-block rounded-md px-2 py-1 text-xs shadow-md',
  {
    variants: {
      placement: {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      },
      intent: {
        primary: 'bg-neutral-800 text-white',
        secondary: 'bg-secondary text-secondary-foreground',
        tertiary: 'bg-tertiary text-tertiary-foreground',
        quaternary: 'bg-quaternary text-quaternary-foreground',
        success: 'bg-success text-success-foreground',
      },
    },
    defaultVariants: {
      placement: 'top',
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
}

export const Tooltip = ({
  children,
  content,
  placement,
  intent,
}: TooltipProps) => {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();

  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  const child = React.cloneElement(children, {
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
    <span className="relative inline-block">
      {child}
      {open && (
        <span
          role="tooltip"
          id={id}
          className={cn(tooltipVariants({ placement, intent }))}
        >
          {content}
          <span className={cn(arrowVariants({ placement, intent }))} />
        </span>
      )}
    </span>
  );
};

Tooltip.displayName = 'Tooltip';

export { tooltipVariants };
