import * as React from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/atoms/Button/Button';
import { modalVariants } from '@/atoms/Modal';
import { cn } from '@/lib/utils';

export interface ConfirmationDialogProps {
  /** Controls visibility of the dialog */
  isOpen: boolean;
  /** Heading text */
  title: string;
  /** Description or message */
  message: React.ReactNode;
  /** Label for the confirm button */
  confirmLabel?: string;
  /** Label for the cancel button */
  cancelLabel?: string;
  /** Called when user confirms */
  onConfirm: () => void;
  /** Called when user cancels */
  onCancel: () => void;
  /** Show warning style */
  danger?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  danger = false,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cancelButtonRef = React.useRef<HTMLButtonElement>(null);
  const lastFocused = React.useRef<Element | null>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    lastFocused.current = document.activeElement;
    const container = containerRef.current;
    // focus cancel button initially
    setTimeout(() => cancelButtonRef.current?.focus(), 0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
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
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={(e) => {
          e.stopPropagation();
          onCancel();
        }}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        className={cn(modalVariants({ variant: 'default', size: 'md' }))}
        ref={containerRef}
        tabIndex={-1}
      >
        <h2 id="confirm-dialog-title" className="text-lg font-semibold mb-2">
          {title}
        </h2>
        <div id="confirm-dialog-message" className="mb-4 flex items-start gap-2">
          {danger && (
            <AlertTriangle
              className="mt-0.5 text-destructive flex-shrink-0"
              size={20}
              aria-hidden="true"
            />
          )}
          <div className="flex-1 text-sm">{message}</div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            intent="secondary"
            onClick={onCancel}
            ref={cancelButtonRef}
          >
            {cancelLabel}
          </Button>
          <Button intent={danger ? 'tertiary' : 'primary'} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

ConfirmationDialog.displayName = 'ConfirmationDialog';
