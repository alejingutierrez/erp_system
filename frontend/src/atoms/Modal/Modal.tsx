import * as React from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const modalVariants = cva(
  'relative w-full rounded-md p-6 shadow-lg focus:outline-none',
  {
    variants: {
      variant: {
        default: 'bg-white',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        tertiary: 'bg-tertiary text-tertiary-foreground',
        quaternary: 'bg-quaternary text-quaternary-foreground',
        success: 'bg-success text-success-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        glass: 'bg-surfaceGlass backdrop-blur-lg shadow-glass',
      },
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface ModalProps extends VariantProps<typeof modalVariants> {
  /** Controls visibility */
  isOpen: boolean;
  /** Callback when user requests to close */
  onClose: () => void;
  /** Optional title for aria-labelledby */
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  variant,
  size,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lastFocused = React.useRef<Element | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      lastFocused.current = document.activeElement;
      const container = containerRef.current;
      if (container) {
        // delay focus to allow portal mount
        setTimeout(() => container.focus(), 0);
      }
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        } else if (e.key === 'Tab') {
          const focusable = container?.querySelectorAll<HTMLElement>(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
          );
          if (!focusable || focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        (lastFocused.current as HTMLElement | null)?.focus?.();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        className={cn(modalVariants({ variant, size, className }))}
        ref={containerRef}
        tabIndex={-1}
      >
        {title && (
          <h2 id="modal-title" className="text-lg font-semibold mb-4">
            {title}
          </h2>
        )}
        <button
          type="button"
          aria-label="Close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-2 right-2 rounded-md p-1 text-muted hover:bg-muted hover:text-foreground focus:outline-none"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export { modalVariants };
