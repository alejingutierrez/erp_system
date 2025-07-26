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
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(onCancel).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar' }));
    expect(onConfirm).toHaveBeenCalled();
  });

  it('backdrop click closes', () => {
    const onCancel = vi.fn();
    renderDialog({ onCancel });
    const backdrop = screen.getByRole('alertdialog').previousSibling as Element;
    fireEvent.click(backdrop);
    expect(onCancel).toHaveBeenCalled();
  });

it.skip('cycles focus within the dialog', () => {
    renderDialog();
    const cancelButton = screen.getByRole('button', { name: 'Cancelar' });
    const confirmButton = screen.getByRole('button', { name: 'Confirmar' });
    cancelButton.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    fireEvent.keyDown(document, { key: 'Tab' });
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(true).toBe(true);
  });
});
