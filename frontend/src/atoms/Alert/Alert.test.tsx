import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders message text', () => {
    render(<Alert>Mensaje</Alert>);
    expect(screen.getByText('Mensaje')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    render(<Alert variant="success">ok</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert.className).toContain('border-success');
  });

  it('shows corresponding icon', () => {
    render(<Alert variant="error">fail</Alert>);
    const svg = screen.getByRole('alert').querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('calls onClose when dismissed', () => {
    const handleClose = vi.fn();
    render(
      <Alert dismissable onClose={handleClose} title="test">
        text
      </Alert>
    );
    const button = screen.getByRole('button', { name: /cerrar alerta/i });
    fireEvent.click(button);
    expect(handleClose).toHaveBeenCalled();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

