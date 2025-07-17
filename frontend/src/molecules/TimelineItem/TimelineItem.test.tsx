import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TimelineItem } from './TimelineItem';

describe('TimelineItem', () => {
  it('renders title and description', () => {
    render(
      <TimelineItem
        iconName="Clock"
        title="Evento"
        description="Detalle del evento"
      />,
    );
    expect(screen.getByText('Evento')).toBeInTheDocument();
    expect(screen.getByText('Detalle del evento')).toBeInTheDocument();
  });

  it('renders date when provided', () => {
    render(<TimelineItem iconName="Clock" title="Evento" date="01/01/2025" />);
    expect(screen.getByText('01/01/2025')).toBeInTheDocument();
  });

  it('applies color variant', () => {
    render(<TimelineItem iconName="Clock" title="Evento" color="success" />);
    const indicator = screen.getByTestId('indicator');
    expect(indicator.className).toContain('border-success');
  });

  it('merges additional class names', () => {
    render(
      <TimelineItem
        iconName="Clock"
        title="Evento"
        className="mb-4"
        data-testid="item"
      />,
    );
    expect(screen.getByTestId('item').className).toContain('mb-4');
  });
});
