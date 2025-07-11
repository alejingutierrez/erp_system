import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Icon } from './Icon';
import { iconMap } from './icons';

const MockSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-testid="custom" {...props} />
);

describe('Icon', () => {
  it('renders an svg for a given name', () => {
    const { container } = render(<Icon name="Search" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies size and color classes', () => {
    const { container } = render(<Icon name="Heart" size="lg" color="secondary" />);
    const svg = container.querySelector('svg') as SVGSVGElement;
    const classes = svg.getAttribute('class') || '';
    expect(classes).toContain('w-6');
    expect(classes).toContain('text-secondary');
  });

  it('uses aria-label when provided', () => {
    const { container } = render(<Icon name="Star" label="favorite" />);
    const svg = container.querySelector('svg') as SVGSVGElement;
    expect(svg).toHaveAttribute('aria-label', 'favorite');
    expect(svg).not.toHaveAttribute('aria-hidden');
  });

  it('is aria-hidden when no label', () => {
    const { container } = render(<Icon name="Star" />);
    const svg = container.querySelector('svg') as SVGSVGElement;
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders custom svg children', () => {
    const { getByTestId } = render(
      <Icon size="sm" color="quaternary">
        <MockSvg />
      </Icon>
    );
    const svg = getByTestId('custom');
    expect(svg).toBeInTheDocument();
    const classes = svg.getAttribute('class') || '';
    expect(classes).toContain('w-4');
    expect(classes).toContain('text-quaternary');
  });
});
