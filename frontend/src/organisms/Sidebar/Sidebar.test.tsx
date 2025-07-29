import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Sidebar } from './Sidebar';

const navItems = [
    { label: 'Panel', iconName: 'LayoutDashboard', path: '/panel' },
    { label: 'Productos & Catálogo', iconName: 'Package', path: '/productos' },
    { label: 'Inventario', iconName: 'Warehouse', path: '/inventario' },
];

describe('Sidebar', () => {
    it('should render correctly', () => {
        const { container } = render(<Sidebar navItems={navItems} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with no accessibility violations', async () => {
        const { container } = render(<Sidebar navItems={navItems} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('should render all nav items', () => {
        render(<Sidebar navItems={navItems} />);
        expect(screen.getByText('Panel')).toBeInTheDocument();
        expect(screen.getByText('Productos & Catálogo')).toBeInTheDocument();
        expect(screen.getByText('Inventario')).toBeInTheDocument();
    });

    it('should not render labels when collapsed', () => {
        render(<Sidebar navItems={navItems} collapsed />);
        expect(screen.queryByText('Panel')).not.toBeInTheDocument();
        expect(screen.queryByText('Productos & Catálogo')).not.toBeInTheDocument();
        expect(screen.queryByText('Inventario')).not.toBeInTheDocument();
    });
});
