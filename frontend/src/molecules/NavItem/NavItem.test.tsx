import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NavItem } from './NavItem';

describe('NavItem', () => {
  it('renders icon and label', () => {
    render(<NavItem iconName="Home" label="Inicio" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
  });

  it('shows badge when enabled and count > 0', () => {
    render(<NavItem iconName="Mail" label="Mail" showBadge badgeCount={2} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('hides badge when count is 0', () => {
    render(<NavItem iconName="Mail" label="Mail" showBadge badgeCount={0} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('calls onClick handler', () => {
    const handleClick = vi.fn();
    render(<NavItem iconName="Home" label="Inicio" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies active classes', () => {
    render(<NavItem iconName="Home" label="Inicio" active />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-primary');
  });
});
