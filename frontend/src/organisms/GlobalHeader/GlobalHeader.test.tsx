import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { GlobalHeader } from './GlobalHeader';

const navItems = [
    { label: 'Panel', iconName: 'LayoutDashboard', path: '/panel' },
    { label: 'Productos & Catálogo', iconName: 'Package', path: '/productos' },
];

describe('GlobalHeader', () => {
    it('should render correctly', () => {
        const { container } = render(<GlobalHeader navItems={navItems} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with no accessibility violations', async () => {
        const { container } = render(<GlobalHeader navItems={navItems} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('should render the sidebar', () => {
        render(<GlobalHeader navItems={navItems} />);
        expect(screen.getByText('Panel')).toBeInTheDocument();
        expect(screen.getByText('Productos & Catálogo')).toBeInTheDocument();
    });

    it('should render the topbar', () => {
        render(<GlobalHeader navItems={navItems} userName="Jane Doe" />);
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });

    it('should render the level 2 panel when title is provided', () => {
        render(<GlobalHeader navItems={navItems} level2Title="Test Panel" />);
        expect(screen.getByText('Test Panel')).toBeInTheDocument();
    });
});
