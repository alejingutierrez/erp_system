import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { TopBar } from './TopBar';

describe('TopBar', () => {
    it('should render correctly', () => {
        const { container } = render(<TopBar />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with no accessibility violations', async () => {
        const { container } = render(<TopBar />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('should render user name', () => {
        render(<TopBar userName="Jane Doe" />);
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });

    it('should render notifications count', () => {
        render(<TopBar notificationsCount={5} />);
        expect(screen.getByText('5')).toBeInTheDocument();
    });
});
