import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Level2Panel } from './Level2Panel';

describe('Level2Panel', () => {
    it('should render correctly', () => {
        const { container } = render(<Level2Panel title="Test Panel" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with no accessibility violations', async () => {
        const { container } = render(<Level2Panel title="Test Panel" />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('should render title', () => {
        render(<Level2Panel title="Test Panel" />);
        expect(screen.getByText('Test Panel')).toBeInTheDocument();
    });

    it('should render actions', () => {
        const actions = [
            { label: 'Action 1', onClick: () => {} },
            { label: 'Action 2', onClick: () => {} },
        ];
        render(<Level2Panel title="Test Panel" actions={actions} />);
        expect(screen.getByText('Action 1')).toBeInTheDocument();
        expect(screen.getByText('Action 2')).toBeInTheDocument();
    });
});
