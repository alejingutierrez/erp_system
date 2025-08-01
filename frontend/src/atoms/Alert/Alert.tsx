import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

const alertVariants = cva(
  'relative w-full flex items-start gap-2 rounded-md border-l-4 p-4 text-sm',
  {
    variants: {
      variant: {
        info: 'bg-secondary/20 text-secondary border-secondary',
        success: 'bg-success/20 text-success border-success',
        warning: 'bg-quaternary/20 text-quaternary-foreground border-quaternary',
        error: 'bg-destructive/20 text-destructive border-destructive',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
);

type AlertVariant = VariantProps<typeof alertVariants>['variant'];

const iconMap: Record<AlertVariant, React.ElementType> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  dismissable?: boolean;
  onClose?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    { className, variant, title, children, dismissable = false, onClose, ...props },
    ref,
  ) => {
    const [visible, setVisible] = React.useState(true);
    const [hovered, setHovered] = React.useState(false);
    const Icon = iconMap[variant ?? 'info'];

    const handleClose = () => {
      onClose?.();
      setVisible(false);
    };

    React.useEffect(() => {
      const timer = setTimeout(handleClose, 6000);
      return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
      <div
        role="alert"
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(alertVariants({ variant, className }))}
        {...props}
      >
        <Icon
          className={cn(
            'mt-0.5 flex-shrink-0',
            variant === 'warning' && 'text-quaternary'
          )}
          size={20}
          aria-hidden="true"
        />
        <div className="flex-1">
          {title && <h5 className="font-semibold mb-1">{title}</h5>}
          {children}
        </div>
        {(dismissable || hovered) && (
          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar alerta"
            className="absolute top-2 right-2 rounded p-1 opacity-0 transition-opacity hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            style={{ opacity: dismissable || hovered ? 1 : 0 }}
          >
            <X size={14} />
          </button>
        )}
      </div>
    );
  },
);
Alert.displayName = 'Alert';

