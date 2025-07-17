import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Tabs, TabItem } from './Tabs';

describe('Tabs', () => {
  const items: TabItem[] = [
    { label: 'One', content: <div>First</div> },
    { label: 'Two', content: <div>Second</div> },
    { label: 'Three', content: <div>Third</div> },
  ];

  it('renders all tab buttons', () => {
    render(<Tabs items={items} />);
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('changes content when a tab is clicked', () => {
    render(<Tabs items={items} />);
    fireEvent.click(screen.getByText('Two'));
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('sets aria-selected correctly', () => {
    render(<Tabs items={items} defaultIndex={1} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('navigates with arrow keys', async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} />);
    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    await user.keyboard('{arrowright}');
    expect(tabs[1]).toHaveFocus();
  });

  it('shows content in accordion variant', () => {
    render(<Tabs items={items} variant="accordion" />);
    expect(screen.getByText('First')).toBeVisible();
    fireEvent.click(screen.getByText('Two'));
    expect(screen.getByText('Second')).toBeVisible();
  });
});
