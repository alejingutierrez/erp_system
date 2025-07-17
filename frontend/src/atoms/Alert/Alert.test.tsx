import { render, screen, fireEvent, act } from '@testing-library/react';
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

  it('uses readable text color for warning', () => {
    render(<Alert variant="warning">warn</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert.className).toContain('text-quaternary-foreground');
  });

  it('shows corresponding icon', () => {
    render(<Alert variant="error">fail</Alert>);
    const svg = screen.getByRole('alert').querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('auto dismisses after 6 seconds', () => {
    vi.useFakeTimers();
    render(<Alert>bye</Alert>);
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('shows close button on hover', () => {
    render(<Alert>hover me</Alert>);
    const alert = screen.getByRole('alert');
    act(() => {
      fireEvent.mouseEnter(alert);
    });
    expect(screen.getByRole('button', { name: /cerrar alerta/i })).toBeInTheDocument();
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

