import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  it('renders product name and price', () => {
    render(<ProductCard productName="Camisa" price="$10" />);
    expect(screen.getByText('Camisa')).toBeInTheDocument();
    expect(screen.getByText('$10')).toBeInTheDocument();
  });

  it('shows out of stock badge', () => {
    render(<ProductCard productName="Camisa" price="$10" outOfStock />);
    expect(screen.getByText('Sin stock')).toBeInTheDocument();
  });

  it('calls onClick when clickable', () => {
    const handleClick = vi.fn();
    render(<ProductCard productName="Camisa" price="$10" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('calls action handlers', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const onAdd = vi.fn();
    render(
      <ProductCard
        productName="Camisa"
        price="$10"
        showActions
        onEdit={onEdit}
        onDelete={onDelete}
        onAddToCart={onAdd}
      />,
    );
    const buttons = screen.getAllByRole('button');
    // first is card; second etc.
    fireEvent.click(buttons[1]);
    expect(onEdit).toHaveBeenCalled();
    fireEvent.click(buttons[2]);
    expect(onDelete).toHaveBeenCalled();
    fireEvent.click(buttons[3]);
    expect(onAdd).toHaveBeenCalled();
  });
});
