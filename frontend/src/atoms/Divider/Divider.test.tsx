import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders an hr by default', () => {
    render(<Divider />);
    const separator = screen.getByRole('separator');
    expect(separator.tagName).toBe('HR');
    expect(separator.className).toContain('border-neutral-400');
  });

  it('renders vertical orientation', () => {
    render(<Divider orientation="vertical" data-testid="v" />);
    const separator = screen.getByTestId('v');
    expect(separator.tagName).toBe('DIV');
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    expect(separator.className).toContain('w-px');
  });

  it('applies spacing variants', () => {
    const { rerender } = render(<Divider spacing="sm" />);
    let separator = screen.getByRole('separator');
    expect(separator.className).toContain('my-1');
    rerender(<Divider spacing="lg" />);
    separator = screen.getByRole('separator');
    expect(separator.className).toContain('my-6');
  });

  it('applies color variants', () => {
    const { rerender } = render(<Divider color="primary" />);
    let separator = screen.getByRole('separator');
    expect(separator.className).toContain('border-primary');
    rerender(<Divider color="quaternary" />);
    separator = screen.getByRole('separator');
    expect(separator.className).toContain('border-2');
  });

  it('accepts custom className', () => {
    render(<Divider className="border-2" />);
    const separator = screen.getByRole('separator');
    expect(separator).toHaveClass('border-2');
  });
});
