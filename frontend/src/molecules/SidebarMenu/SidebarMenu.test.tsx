import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SidebarMenu, NavLink } from './SidebarMenu';

const items: NavLink[] = [
  { label: 'Inicio', icon: 'Home', path: '/home' },
];

describe('SidebarMenu', () => {
  it('toggles collapse state', () => {
    render(<SidebarMenu items={items} onNavigate={() => {}} />);
    const toggle = screen.getByRole('button', { name: /collapse menu/i });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-label', 'Expand menu');
  });

  it('navigates on item click', () => {
    const onNavigate = vi.fn();
    render(<SidebarMenu items={items} onNavigate={onNavigate} />);
    fireEvent.click(screen.getByRole('button', { name: 'Inicio' }));
    expect(onNavigate).toHaveBeenCalledWith('/home');
  });
});
