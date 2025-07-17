import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('renders value and label', () => {
    render(<StatCard value="42" label="Test" />);
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('shows icon when iconName is provided', () => {
    const { container } = render(
      <StatCard value="1" label="Icon" iconName="Home" />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('calls onClick when clickable', () => {
    const handleClick = vi.fn();
    render(
      <StatCard value="10" label="Clickable" clickable onClick={handleClick} />,
    );
    fireEvent.click(screen.getByText('10'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies clickable styles', () => {
    render(<StatCard value="5" label="Hover" clickable />);
    const card = screen.getByText('5').closest('div');
    expect(card?.className).toContain('cursor-pointer');
  });
});
