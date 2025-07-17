import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const toastVariants = cva(
  'fixed z-50 pointer-events-auto flex items-center gap-2 rounded-md shadow-lg px-4 py-2 text-sm transition-opacity',
  {
    variants: {
      intent: {
        info: 'bg-secondary text-secondary-foreground',
        success: 'bg-success text-success-foreground',
        error: 'bg-destructive text-destructive-foreground',
      },
      position: {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
      },
    },
    defaultVariants: {
      intent: 'info',
      position: 'top-right',
    },
  },
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  duration?: number;
  onDismiss?: () => void;
  showClose?: boolean;
  showIcon?: boolean;
}

type ToastIntent = VariantProps<typeof toastVariants>['intent'];

const iconMap: Record<ToastIntent, React.ElementType> = {
  info: Info,
  success: CheckCircle2,
  error: AlertCircle,
};

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      intent,
      position,
      duration = 3000,
      onDismiss,
      showClose = true,
      showIcon = true,
      children,
      ...props
    },
    ref,
  ) => {
    React.useEffect(() => {
      if (!onDismiss) return;
      const timer = setTimeout(() => onDismiss(), duration);
      return () => clearTimeout(timer);
    }, [onDismiss, duration]);

    const Icon = iconMap[intent ?? 'info'];

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ intent, position }), className)}
        role="status"
        {...props}
      >
        {showIcon && <Icon size={16} aria-hidden="true" />}
        <div className="flex-1">{children}</div>
        {showClose && onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Close"
            className="ml-2"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  },
);

Toast.displayName = 'Toast';

export { toastVariants };
