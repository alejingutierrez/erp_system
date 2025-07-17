import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

const renderModal = (
  isOpen: boolean,
  onClose = vi.fn(),
  extraProps: Partial<React.ComponentProps<typeof Modal>> = {},
) =>
  render(
    <Modal isOpen={isOpen} onClose={onClose} title="Test Modal" {...extraProps}>
      <p>content</p>
      <button>ok</button>
    </Modal>,
  );

describe('Modal', () => {
  it('renders when open', () => {
    renderModal(true);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderModal(false);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when overlay clicked', () => {
    const onClose = vi.fn();
    renderModal(true, onClose);
    fireEvent.click(screen.getByRole('dialog').previousSibling as Element);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when Escape key pressed', () => {
    const onClose = vi.fn();
    renderModal(true, onClose);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('renders a close button', () => {
    renderModal(true);
    expect(screen.getByLabelText(/close/i)).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    renderModal(true, vi.fn(), { variant: 'primary' });
    expect(screen.getByRole('dialog').className).toContain('bg-primary');
  });

  it('focuses the modal when opened', async () => {
    renderModal(true);
    await screen.findByRole('dialog');
    expect(screen.getByRole('dialog')).toHaveFocus();
  });
});
