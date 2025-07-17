import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with default classes', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('animate-spinner-fancy');
    expect(spinner).toHaveClass('border-primary');
  });

  it('applies size variants', () => {
    const { rerender } = render(<Spinner size="sm" />);
    let spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('h-4 w-4');

    rerender(<Spinner size="lg" />);
    spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('h-8 w-8');
  });

  it('applies color variants', () => {
    const { rerender } = render(<Spinner intent="secondary" />);
    let spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('border-secondary');

    rerender(<Spinner intent="success" />);
    spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('border-success');
  });

  it('renders accessible label', () => {
    render(<Spinner label="Cargando" />);
    expect(screen.getByText('Cargando')).toHaveClass('sr-only');
  });
});
