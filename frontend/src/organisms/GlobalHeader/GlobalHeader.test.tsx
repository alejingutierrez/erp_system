import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GlobalHeader } from './GlobalHeader';

const items = [
  { label: 'Home', iconName: 'Home', path: '/home' },
  { label: 'Users', iconName: 'Users', path: '/users' },
];

const submenu = [
  {
    label: 'Reports',
    iconName: 'BarChart2' as const,
    children: [{ label: 'Sales', path: '/reports/sales' }],
  },
];

const resize = (w: number) => {
  act(() => {
    window.innerWidth = w;
    window.dispatchEvent(new Event('resize'));
  });
};

describe('GlobalHeader', () => {
  it('renders logo and actions', () => {
    resize(1280); // Asegura modo desktop
    render(
      <GlobalHeader
        logo={<span>Logo</span>}
        navItems={items}
        userName="Ana"
        userMenuItems={[{ label: 'Logout' }]}
        actionLabel="New"
        notificationsCount={2}
      />,
    );
    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Notifications' })).toBeInTheDocument();
    expect(screen.getByText('Ana')).toBeInTheDocument();
  });

  it('calls callbacks', () => {
    const onNav = vi.fn();
    const onSearch = vi.fn();
    const onNotif = vi.fn();
    render(
      <GlobalHeader
        navItems={items}
        onNavigate={onNav}
        onSearch={onSearch}
        onNotificationsOpen={onNotif}
        notificationsCount={1}
      />,
    );
    fireEvent.click(screen.getByText('Home'));
    expect(onNav).toHaveBeenCalledWith('/home');
    fireEvent.submit(screen.getByRole('search'));
    expect(onSearch).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Notifications' }));
    expect(onNotif).toHaveBeenCalled();
  });

  it('collapses navigation on mobile', () => {
    resize(500);
    render(<GlobalHeader navItems={items} />);
    expect(screen.getByLabelText('Menu')).toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Menu'));
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByRole('search')).toBeInTheDocument();

    resize(1100);
    expect(screen.queryByLabelText('Menu')).not.toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('navigates via submenu', () => {
    const onNav = vi.fn();
    resize(1280);
    render(<GlobalHeader navItems={submenu} onNavigate={onNav} />);
    fireEvent.click(screen.getByRole('button', { name: 'Reports' }));
    fireEvent.click(screen.getByText('Sales'));
    expect(onNav).toHaveBeenCalledWith('/reports/sales');
  });

  it('selects store and opens search via shortcut', () => {
    resize(1280);
    const onStore = vi.fn();
    render(
      <GlobalHeader navItems={items} stores={['A', 'B']} selectedStore="A" onStoreChange={onStore} />,
    );
    fireEvent.click(screen.getByDisplayValue('A'));
    fireEvent.click(screen.getByText('B'));
    expect(onStore).toHaveBeenCalledWith('B');
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
