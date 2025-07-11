import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Link } from './Link';

describe('Link', () => {
  it('renders anchor with href and children', () => {
    render(<Link href="/home">Home</Link>);
    const link = screen.getByRole('link', { name: /home/i });
    expect(link).toHaveAttribute('href', '/home');
  });

  it('applies color variant', () => {
    render(<Link href="#" color="tertiary">Tertiary</Link>);
    const link = screen.getByRole('link', { name: /tertiary/i });
    expect(link.className).toContain('text-tertiary');
  });

  it('has underline by default', () => {
    render(<Link href="#">Default</Link>);
    const link = screen.getByRole('link', { name: /default/i });
    expect(link.className).toContain('underline');
  });

  it('adds target and rel for external links', () => {
    render(<Link href="https://example.com" isExternal>External</Link>);
    const link = screen.getByRole('link', { name: /external/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
