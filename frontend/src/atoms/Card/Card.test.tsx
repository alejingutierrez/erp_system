import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>content</Card>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    render(<Card>card</Card>);
    const card = screen.getByText('card');
    expect(card).toHaveClass('shadow-md');
    expect(card).toHaveClass('p-4');
  });

  it('applies outline variant', () => {
    render(<Card variant="outline">card</Card>);
    const card = screen.getByText('card');
    expect(card).toHaveClass('shadow-none');
  });

  it('applies glass variant', () => {
    render(<Card variant="glass">glass</Card>);
    const card = screen.getByText('glass');
    expect(card.className).toContain('backdrop-blur-md');
  });

  it('adds hover effect when clickable', () => {
    render(
      <Card clickable data-testid="clickable">
        hi
      </Card>
    );
    expect(screen.getByTestId('clickable').className).toContain('cursor-pointer');
  });
});
