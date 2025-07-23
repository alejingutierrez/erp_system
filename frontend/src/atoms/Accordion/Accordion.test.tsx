import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Accordion } from './Accordion';

describe('Accordion', () => {
  it('renders title and children', () => {
    const { container } = render(
      <Accordion title="Title">Content</Accordion>,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('bg-white');
  });

  it('hides content when closed', () => {
    render(<Accordion title="Title">Hidden</Accordion>);
    const region = screen.getByRole('region');
    expect(region).toHaveClass('hidden');
  });

  it('shows content when open', () => {
    render(
      <Accordion title="Title" defaultOpen>
        Visible
      </Accordion>,
    );
    expect(screen.getByText('Visible')).toBeInTheDocument();
  });

  it('toggles on header click', () => {
    const onToggle = vi.fn();
    render(
      <Accordion title="Title" onToggle={onToggle}>
        Toggle
      </Accordion>,
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalledWith(true);
    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('sets aria attributes correctly', () => {
    render(<Accordion title="A" defaultOpen>Content</Accordion>);
    const button = screen.getByRole('button');
    const region = screen.getByRole('region');
    expect(button).toHaveAttribute('aria-controls', region.id);
    expect(region).toHaveAttribute('aria-labelledby', button.id);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
