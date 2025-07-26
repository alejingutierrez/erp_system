import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NotificationList, Notification } from './NotificationList';

const createItems = (count: number): Notification[] =>
  Array.from({ length: count }).map((_, i) => ({
    id: String(i),
    title: `N${i}`,
    message: 'msg',
    date: new Date(2025, 5, i + 1),
    read: false,
    type: 'info',
  }));

describe('NotificationList', () => {
  it('marks item as read when clicked', () => {
    render(<NotificationList notifications={createItems(1)} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('Nuevo')).not.toBeInTheDocument();
  });

  it('mark all button updates state', () => {
    render(<NotificationList notifications={createItems(2)} />);
    fireEvent.click(screen.getByText('Marcar todo como leído'));
    expect(screen.queryByText('Nuevo')).not.toBeInTheDocument();
  });

  it('applies scroll style when exceeding maxVisible', () => {
    render(<NotificationList notifications={createItems(5)} maxVisible={2} />);
    const list = screen.getByRole('list');
    expect(list.style.maxHeight).not.toBe('');
  });
});
