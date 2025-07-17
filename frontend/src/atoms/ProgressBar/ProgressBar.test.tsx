import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('applies width based on value', () => {
    render(<ProgressBar value={40} />);
    const indicator = screen.getByRole('progressbar').firstChild as HTMLElement;
    expect(indicator).toHaveStyle('width: 40%');
  });

  it('renders indeterminate animation when no value', () => {
    render(<ProgressBar />);
    const indicator = screen.getByRole('progressbar').firstChild as HTMLElement;
    expect(indicator.className).toContain('animate-indeterminate');
  });

  it('applies size variants', () => {
    const { rerender } = render(<ProgressBar size="sm" value={10} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveClass('h-1.5');

    rerender(<ProgressBar size="lg" value={10} />);
    expect(bar).toHaveClass('h-3');
  });
});
