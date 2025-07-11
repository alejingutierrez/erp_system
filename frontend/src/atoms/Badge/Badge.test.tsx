import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge.className).toContain('bg-muted');
    expect(badge).toHaveClass('inline-flex');
  });

  it('applies variant class', () => {
    render(<Badge variant="success">Ok</Badge>);
    expect(screen.getByText('Ok').className).toContain('bg-success');
  });

  it('merges custom class names', () => {
    render(<Badge className="custom">A</Badge>);
    const badge = screen.getByText('A');
    expect(badge).toHaveClass('custom');
    expect(badge).toHaveClass('rounded-full');
  });
});
