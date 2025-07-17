import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders title and message', () => {
    render(
      <EmptyState title="No hay datos" message="Agrega un elemento" />,
    );
    expect(screen.getByText('No hay datos')).toBeInTheDocument();
    expect(screen.getByText('Agrega un elemento')).toBeInTheDocument();
  });

  it('hides icon when hideIcon is true', () => {
    render(<EmptyState title="Empty" hideIcon />);
    const icon = screen.queryByRole('img');
    expect(icon).not.toBeInTheDocument();
  });

  it('calls onAction when button clicked', () => {
    const handle = vi.fn();
    render(
      <EmptyState title="Empty" actionLabel="Add" onAction={handle} />,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('does not render button without actionLabel', () => {
    render(<EmptyState title="Empty" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
