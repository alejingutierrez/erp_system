import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OrderListItem } from './OrderListItem';

const baseProps = {
  orderId: '1001',
  date: '01/09/2025',
  customerName: 'Juan Perez',
  total: '$250.00',
  status: 'Pendiente',
};

describe('OrderListItem', () => {
  it('renders order information', () => {
    render(<OrderListItem {...baseProps} />);
    expect(screen.getByText('#1001')).toBeInTheDocument();
    expect(screen.getByText('Juan Perez')).toBeInTheDocument();
    expect(screen.getByText('$250.00')).toBeInTheDocument();
  });

  it('shows action menu trigger when enabled', () => {
    const { container } = render(
      <OrderListItem
        {...baseProps}
        showActions
        actionOptions={[{ label: 'Editar', iconName: 'Edit' }]}
      />,
    );
    expect(screen.getByLabelText('Acciones')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(
      'grid-cols-[auto_auto_1fr_auto_auto_auto]',
    );
  });

  it('calls onClick handler', () => {
    const handleClick = vi.fn();
    render(<OrderListItem {...baseProps} onClick={handleClick} />);
    fireEvent.click(screen.getByText('#1001'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onActionSelect when menu option selected', () => {
    const handleAction = vi.fn();
    render(
      <OrderListItem
        {...baseProps}
        showActions
        actionOptions={[
          { label: 'Editar', iconName: 'Edit' },
          { label: 'Eliminar', iconName: 'Trash2' },
        ]}
        onActionSelect={handleAction}
      />,
    );
    fireEvent.click(screen.getByLabelText('Acciones'));
    fireEvent.click(screen.getByText('Eliminar'));
    expect(handleAction).toHaveBeenCalledWith(
      { label: 'Eliminar', iconName: 'Trash2' },
      1,
    );
  });

  it('maps status to badge variant', () => {
    render(<OrderListItem {...baseProps} status="Entregado" />);
    const badge = screen.getByText('Entregado');
    expect(badge.className).toContain('bg-success');
  });

  it('calls onStatusClick when badge clicked', () => {
    const handleStatus = vi.fn();
    render(<OrderListItem {...baseProps} onStatusClick={handleStatus} />);
    fireEvent.click(screen.getByText('Pendiente'));
    expect(handleStatus).toHaveBeenCalledTimes(1);
  });
});
