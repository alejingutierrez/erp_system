import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NotificationIcon } from './NotificationIcon';

describe('NotificationIcon', () => {
  it('renders icon button', () => {
    render(<NotificationIcon count={1} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('shows badge when count > 0', () => {
    render(<NotificationIcon count={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('hides badge when count is 0', () => {
    render(<NotificationIcon count={0} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('caps display at 99+', () => {
    render(<NotificationIcon count={120} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('badge text is black for all variants', () => {
    const variants = ['neutral', 'success', 'warning', 'destructive', 'info'] as const;
    variants.forEach((variant) => {
      const { unmount } = render(<NotificationIcon count={3} color={variant} />);
      const badge = screen.getByText('3');
      expect(badge).toHaveClass('!text-black');
      unmount();
    });
  });

  it('positions badge outside icon for large counts', () => {
    render(<NotificationIcon count={120} />);
    const badge = screen.getByText('99+');
    expect(badge.className).toContain('translate-x-1/2');
  });

  it('calls onClick handler', () => {
    const handleClick = vi.fn();
    render(<NotificationIcon count={2} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
