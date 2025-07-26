import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatsGroup } from './StatsGroup';

const stats = [
  { value: '1', label: 'A' },
  { value: '2', label: 'B' },
];

describe('StatsGroup', () => {
  it('renders provided stat cards', () => {
    render(<StatsGroup stats={stats} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('uses row layout', () => {
    const { container } = render(<StatsGroup stats={stats} direction="row" />);
    expect(container.firstChild).toHaveClass('grid-flow-col');
  });

  it('uses column layout', () => {
    const { container } = render(<StatsGroup stats={stats} direction="column" />);
    expect(container.firstChild).toHaveClass('grid-flow-row');
  });

  it('uses auto layout classes', () => {
    const { container } = render(<StatsGroup stats={stats} direction="auto" />);
    const className = container.firstChild?.getAttribute('class') ?? '';
    expect(className).toContain('grid-flow-row');
    expect(className).toContain('sm:grid-flow-col');
  });
});
