import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CustomerListItem } from './CustomerListItem';

describe('CustomerListItem', () => {
  it('renders name and email', () => {
    render(<CustomerListItem customerName="John Doe" email="john@example.com" />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('calls onClick handler', () => {
    const handleClick = vi.fn();
    render(
      <CustomerListItem customerName="John Doe" email="john@example.com" onClick={handleClick} />,
    );
    const item = screen.getByRole('button');
    fireEvent.click(item);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('triggers onEdit from the action menu', () => {
    const handleEdit = vi.fn();
    render(
      <CustomerListItem
        customerName="John Doe"
        email="john@example.com"
        showActions
        onEdit={handleEdit}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Más acciones' }));
    fireEvent.click(screen.getByText('Editar'));
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });

  it('opens action menu when options provided', () => {
    const onSelect = vi.fn();
    const options = [
      { label: 'Edit', iconName: 'Edit' },
      { label: 'Contact', iconName: 'Mail' },
    ];
    render(
      <CustomerListItem
        customerName="Jane"
        email="jane@example.com"
        showActions
        actionMenuOptions={options}
        onMenuOptionSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Más acciones' }));
    fireEvent.click(screen.getByText('Contact'));
    expect(onSelect).toHaveBeenCalledWith(options[1], 1);
  });

  it('displays inactive badge when active is false', () => {
    render(
      <CustomerListItem customerName="John Doe" email="john@example.com" active={false} />,
    );
    expect(screen.getByText('Inactivo')).toBeInTheDocument();
  });
});
