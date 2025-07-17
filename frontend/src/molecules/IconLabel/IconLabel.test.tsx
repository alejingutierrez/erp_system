import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { IconLabel } from './IconLabel';

describe('IconLabel', () => {
  it('renders icon and text', () => {
    const { container } = render(<IconLabel iconName="Mail" text="info" />);
    expect(screen.getByText('info')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies size variants', () => {
    const { container } = render(
      <IconLabel iconName="Mail" text="large" size="lg" />,
    );
    const svg = container.querySelector('svg') as SVGSVGElement;
    const textEl = screen.getByText('large');
    expect(svg.getAttribute('class')).toContain('w-6');
    expect(textEl.className).toContain('text-xl');
  });

  it('applies color variants', () => {
    const { container } = render(
      <IconLabel iconName="Mail" text="secondary" color="secondary" />,
    );
    const svg = container.querySelector('svg') as SVGSVGElement;
    const textEl = screen.getByText('secondary');
    expect(svg.getAttribute('class')).toContain('text-secondary');
    expect(textEl.className).toContain('text-secondary');
  });

  it('forwards click events', () => {
    const handleClick = vi.fn();
    render(
      <IconLabel
        iconName="Mail"
        text="clickable"
        onClick={handleClick}
        data-testid="wrapper"
      />,
    );
    fireEvent.click(screen.getByTestId('wrapper'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
