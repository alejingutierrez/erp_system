import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartItem } from './CartItem';

describe('CartItem', () => {
  it('calls onQtyChange when buttons clicked', () => {
    const handleChange = vi.fn();
    render(
      <CartItem
        id="1"
        img="img.png"
        name="Item"
        price={10}
        quantity={1}
        stock={5}
        onQtyChange={handleChange}
        onRemove={() => {}}
      />,
    );
    fireEvent.click(screen.getByLabelText('Añadir uno'));
    expect(handleChange).toHaveBeenCalledWith(2);
    fireEvent.click(screen.getByLabelText('Quitar uno'));
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('calls onRemove', () => {
    const onRemove = vi.fn();
    render(
      <CartItem
        id="1"
        img="img.png"
        name="Item"
        price={10}
        quantity={1}
        onQtyChange={() => {}}
        onRemove={onRemove}
      />,
    );
    fireEvent.click(screen.getByLabelText('Eliminar artículo'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
