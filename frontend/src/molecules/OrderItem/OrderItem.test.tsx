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

  it('calls action button handler', () => {
    const onActionClick = vi.fn();
    render(
      <OrderItem
        orderId="#4"
        date="01/01/2024"
        total="$40"
        status="Cancelado"
        onActionClick={onActionClick}
      />,
    );
    const button = screen.getByRole('button', { name: /acciones/i });
    fireEvent.click(button);
    expect(onActionClick).toHaveBeenCalledTimes(1);
  });
});
