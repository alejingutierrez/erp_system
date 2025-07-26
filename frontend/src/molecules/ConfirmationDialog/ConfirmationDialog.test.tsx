import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ConfirmationDialog } from './ConfirmationDialog';

const renderDialog = (
  props: Partial<React.ComponentProps<typeof ConfirmationDialog>> = {},
) =>
  render(
    <ConfirmationDialog
      isOpen
      title="Confirmar"
      message="¿Seguro?"
      onConfirm={() => {}}
      onCancel={() => {}}
      {...props}
    />,
  );

describe('ConfirmationDialog', () => {
  it('calls onConfirm and onCancel', () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    renderDialog({ onConfirm, onCancel });

    fireEvent.click(screen.getByRole('button', { name: /Cancelar/i }));
    expect(onCancel).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /Confirmar/i }));
    expect(onConfirm).toHaveBeenCalled();
  });

  it('backdrop click closes', () => {
    const onCancel = vi.fn();
    renderDialog({ onCancel });

    const backdrop = screen.getByRole('alertdialog').previousSibling as Element;
    fireEvent.click(backdrop);
    expect(onCancel).toHaveBeenCalled();
  });

  it('cycles focus within the dialog', () => {
    renderDialog();

    const cancelButton = screen.getByRole('button', { name: /Cancelar/i });
    const confirmButton = screen.getByRole('button', { name: /Confirmar/i });

    // Tab desde el último elemento debería volver al primero
    confirmButton.focus();
    expect(document.activeElement).toBe(confirmButton);

    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(cancelButton);

    // Shift‑Tab desde el primero debería volver al último
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(confirmButton);
  });
});
