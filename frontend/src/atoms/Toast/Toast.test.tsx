import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders message and intent classes', () => {
    render(<Toast intent="success">Saved!</Toast>);
    const toast = screen.getByRole('status');
    expect(toast).toHaveTextContent('Saved!');
    expect(toast.className).toContain('bg-success');
  });

  it('calls onDismiss after duration', () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();
    render(
      <Toast intent="info" duration={1000} onDismiss={onDismiss}>
        Info
      </Toast>
    );
    vi.advanceTimersByTime(1000);
    expect(onDismiss).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('dismisses when close button clicked', () => {
    const onDismiss = vi.fn();
    render(
      <Toast intent="error" onDismiss={onDismiss}>
        Error
      </Toast>
    );
    const button = screen.getByRole('button', { name: /close/i });
    button.click();
    expect(onDismiss).toHaveBeenCalled();
  });
});
