import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OrderItem } from './OrderItem';

describe('OrderItem', () => {
  it('renders order details', () => {
    render(
      <OrderItem orderId="#1" date="01/01/2024" total="$10" status="Pendiente" />,
    );
    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('01/01/2024')).toBeInTheDocument();
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByText('Pendiente')).toBeInTheDocument();
  });

  it('shows icon when enabled', () => {
    render(
      <OrderItem
        orderId="#2"
        date="01/01/2024"
        total="$20"
        status="Entregado"
        showIcon
        iconName="Folder"
        iconColor="primary"
      />,
    );
    const icon = screen.getByTestId('order-icon');
    expect(icon).toBeInTheDocument();
  });

  it('handles select action', () => {
    const onSelect = vi.fn();
    render(
      <OrderItem
        orderId="#3"
        date="01/01/2024"
        total="$30"
        status="En ruta"
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('calls action menu handler', () => {
    const onActionSelect = vi.fn();
    render(
      <OrderItem
        orderId="#4"
        date="01/01/2024"
        total="$40"
        status="Cancelado"
        actionOptions={[
          { label: 'Detalles', iconName: 'Search' },
          { label: 'Eliminar', iconName: 'Trash2' },
        ]}
        onActionSelect={onActionSelect}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /acciones/i }));
    fireEvent.click(screen.getByText('Eliminar'));
    expect(onActionSelect).toHaveBeenCalledWith(
      { label: 'Eliminar', iconName: 'Trash2' },
      1,
    );
  });
});
