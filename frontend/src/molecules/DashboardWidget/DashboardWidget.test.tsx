import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DashboardWidget } from './DashboardWidget';

describe('DashboardWidget', () => {
  it('renders title and value', () => {
    render(<DashboardWidget title="Ventas" value="100" />);
    expect(screen.getByText('Ventas')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('matches snapshot with chart', () => {
    const { container } = render(
      <DashboardWidget
        title="Ventas"
        value="100"
        chart={<svg><circle cx="5" cy="5" r="5" /></svg>}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
