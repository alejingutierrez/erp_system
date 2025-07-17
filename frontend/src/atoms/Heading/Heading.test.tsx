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
    expect(heading.className).toContain('font-light');
  });

  it('uses progressively lighter font weights for each level', () => {
    render(
      <>
        <Heading level={1}>One</Heading>
        <Heading level={2}>Two</Heading>
        <Heading level={3}>Three</Heading>
        <Heading level={4}>Four</Heading>
        <Heading level={5}>Five</Heading>
        <Heading level={6}>Six</Heading>
      </>,
    );

    expect(screen.getByRole('heading', { level: 1 }).className).toContain('font-semibold');
    expect(screen.getByRole('heading', { level: 2 }).className).toContain('font-medium');
    expect(screen.getByRole('heading', { level: 3 }).className).toContain('font-normal');
    expect(screen.getByRole('heading', { level: 4 }).className).toContain('font-light');
    expect(screen.getByRole('heading', { level: 5 }).className).toContain('font-extralight');
    expect(screen.getByRole('heading', { level: 6 }).className).toContain('font-thin');
  });

  it('merges additional classes', () => {
    render(<Heading className="mb-2">Hello</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('mb-2');
  });
});
