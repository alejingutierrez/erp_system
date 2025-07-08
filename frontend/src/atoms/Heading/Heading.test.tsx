import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders the correct level element', () => {
    render(<Heading level={3}>Title</Heading>);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading.tagName).toBe('H3');
  });

  it('allows overriding the element with as prop', () => {
    render(<Heading level={2} as="h1">Text</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.tagName).toBe('H1');
  });

  it('applies variant classes', () => {
    render(
      <Heading level={4} align="center" color="secondary">Content</Heading>
    );
    const heading = screen.getByRole('heading', { level: 4 });
    expect(heading.className).toContain('text-center');
    expect(heading.className).toContain('text-secondary');
  });

  it('merges additional classes', () => {
    render(<Heading className="mb-2">Hello</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('mb-2');
  });
});
