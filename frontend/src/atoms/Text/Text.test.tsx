import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Text } from './Text';

describe('Text', () => {
  it('renders the provided content', () => {
    render(<Text>Hello</Text>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('uses a <p> by default', () => {
    render(<Text>Paragraph</Text>);
    const element = screen.getByText('Paragraph');
    expect(element.tagName).toBe('P');
  });

  it('applies size variants', () => {
    const { rerender } = render(<Text size="sm">small</Text>);
    expect(screen.getByText('small')).toHaveClass('text-sm');

    rerender(<Text size="lg">large</Text>);
    expect(screen.getByText('large')).toHaveClass('text-xl');
  });

  it('applies weight variants', () => {
    const { rerender } = render(<Text weight="normal">w1</Text>);
    expect(screen.getByText('w1')).toHaveClass('font-normal');

    rerender(<Text weight="bold">w2</Text>);
    expect(screen.getByText('w2')).toHaveClass('font-bold');
  });

  it('applies muted style', () => {
    render(<Text muted>Muted</Text>);
    expect(screen.getByText('Muted')).toHaveClass('text-muted-foreground');
  });

  it('allows overriding the element with as prop', () => {
    render(<Text as="span">Inline</Text>);
    const element = screen.getByText('Inline');
    expect(element.tagName).toBe('SPAN');
  });

  it('merges additional class names', () => {
    render(<Text className="mb-2">Class</Text>);
    expect(screen.getByText('Class')).toHaveClass('mb-2');
  });
});
