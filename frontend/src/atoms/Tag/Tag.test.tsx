import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders its children', () => {
    render(<Tag>Test</Tag>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies default outline styles', () => {
    render(<Tag>Default</Tag>);
    const tag = screen.getByText('Default');
    expect(tag.className).toContain('border-primary');
    expect(tag.className).toContain('text-primary');
  });

  it('applies solid variant classes', () => {
    render(
      <Tag variant="solid" color="secondary">
        Solid
      </Tag>
    );
    const tag = screen.getByText('Solid');
    expect(tag.className).toContain('bg-secondary');
    expect(tag.className).toContain('text-secondary-foreground');
  });

  it('renders close button and handles click', () => {
    const onRemove = vi.fn();
    render(<Tag closable onRemove={onRemove}>Filter</Tag>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onRemove).toHaveBeenCalled();
    expect(button).toHaveAttribute('aria-label', 'Quitar etiqueta');
  });
});
