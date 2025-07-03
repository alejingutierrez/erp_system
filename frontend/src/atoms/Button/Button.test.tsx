import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders its children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole('button');
    // Check for a class that is part of the primary intent and md size
    expect(button.className).toContain('from-primary');
    expect(button.className).toContain('h-10');
  });

  it('applies specified variant classes', () => {
    render(<Button intent="secondary" size="lg">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('from-secondary');
    expect(button.className).toContain('h-11');
  });

  it('is disabled when the disabled prop is true', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.className).toContain('disabled:opacity-50');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders a spinner and is disabled when isLoading is true', () => {
    render(<Button isLoading>Loading...</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    // Check that the spinner is rendered
    // The spinner is a div, so we can't query by a specific role.
    // We'll check for its presence by observing the button's children.
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(button.querySelector('.animate-spin')).toBeInTheDocument();
  });

  describe('with icons', () => {
    const MockIcon = (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid="mock-icon" {...props} />
    );

    it('renders a left icon with margin when text is present', () => {
      render(<Button LeftIcon={MockIcon}>Click me</Button>);
      const icon = screen.getByTestId('mock-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('mr-2');
    });

    it('renders a right icon with margin when text is present', () => {
      render(<Button RightIcon={MockIcon}>Click me</Button>);
      const icon = screen.getByTestId('mock-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('ml-2');
    });

    it('renders an icon-only button', () => {
      render(<Button variant="icon" LeftIcon={MockIcon} aria-label="Icon button" />);
      const button = screen.getByRole('button', { name: /icon button/i });
      const icon = screen.getByTestId('mock-icon');
      expect(icon).toBeInTheDocument();
      expect(button.textContent).toBe('');
    });

    it('applies intent color to an icon-only button', () => {
      render(
        <Button variant="icon" intent="success" LeftIcon={MockIcon} aria-label="Icon" />,
      );
      const button = screen.getByRole('button', { name: /icon/i });
      expect(button.className).toContain('text-success');
    });
  });

  it('applies spacing classes for ghost and outline variants', () => {
    render(
      <>
        <Button variant="ghost" size="md">Ghost</Button>
        <Button variant="outline" size="md">Outline</Button>
        <Button variant="glass" size="md">Glass</Button>
      </>,
    );
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button.className).toContain('px-6');
    });
  });
});
