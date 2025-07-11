import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const tooltipVariants = cva(
  'absolute z-50 rounded px-2 py-1 text-xs shadow-md whitespace-nowrap',
  {
    variants: {
      intent: {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        tertiary: 'bg-tertiary text-tertiary-foreground',
        quaternary: 'bg-quaternary text-quaternary-foreground',
        success: 'bg-success text-success-foreground',
      },
      placement: {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      },
    },
    defaultVariants: {
      intent: 'secondary',
      placement: 'top',
    },
  },
);

const arrowVariants = cva('absolute w-2 h-2 rotate-45', {
  variants: {
    intent: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      tertiary: 'bg-tertiary',
      quaternary: 'bg-quaternary',
      success: 'bg-success',
    },
    placement: {
      top: '-bottom-1 left-1/2 -translate-x-1/2',
      bottom: '-top-1 left-1/2 -translate-x-1/2',
      left: '-right-1 top-1/2 -translate-y-1/2',
      right: '-left-1 top-1/2 -translate-y-1/2',
    },
  },
  defaultVariants: {
    intent: 'secondary',
    placement: 'top',
  },
});

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  /** Tooltip text or element */
  content: React.ReactNode;
  /** Additional classes for the wrapper */
  className?: string;
  /** Element that triggers the tooltip */
  children: React.ReactElement;
}

const Tooltip = React.forwardRef<HTMLSpanElement, TooltipProps>(
  ({ content, children, intent, placement, className }, ref) => {
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
      'aria-describedby': id,
    });

    return (
      <span className={cn('relative inline-block', className)} ref={ref}>
        {child}
        {open && (
          <span
            role="tooltip"
            id={id}
            className={cn(tooltipVariants({ intent, placement }))}
          >
            {content}
            <span className={cn(arrowVariants({ intent, placement }))} />
          </span>
        )}
      </span>
    );
  },
);
Tooltip.displayName = 'Tooltip';

export { Tooltip, tooltipVariants };
