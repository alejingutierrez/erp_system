import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('applies width based on value', () => {
    render(<ProgressBar value={40} />);
    const bar = screen.getByRole('progressbar');
    const track = bar.firstChild as HTMLElement;
    const indicator = track.firstChild as HTMLElement;
    expect(indicator).toHaveStyle('width: 40%');
    expect(screen.getByText('40%')).toBeInTheDocument();
  });

  it('renders indeterminate animation when no value', () => {
    render(<ProgressBar />);
    const bar = screen.getByRole('progressbar');
    const track = bar.firstChild as HTMLElement;
    const indicator = track.firstChild as HTMLElement;
    expect(indicator.className).toContain('animate-indeterminate');
    expect(bar.textContent).toBe('');
  });

  it('applies size variants', () => {
    const { rerender } = render(<ProgressBar size="sm" value={10} />);
    const bar = screen.getByRole('progressbar');
    const track = bar.firstChild as HTMLElement;
    expect(track).toHaveClass('h-1.5');

    rerender(<ProgressBar size="lg" value={10} />);
    expect(track).toHaveClass('h-3');
  });

  it('shows clamped value text', () => {
    render(<ProgressBar value={150} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('uses white text for the value label across colors', () => {
    const { rerender } = render(
      <ProgressBar color="primary" value={20} />,
    );
    let label = screen.getByText('20%');
    expect(label.className).toContain('text-white');

    rerender(<ProgressBar color="secondary" value={20} />);
    label = screen.getByText('20%');
    expect(label.className).toContain('text-white');
  });
});
