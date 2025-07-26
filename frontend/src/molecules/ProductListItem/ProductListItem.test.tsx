import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductListItem } from './ProductListItem';

describe('ProductListItem', () => {
  it('renders image alt text', () => {
    render(
      <ul>
        <ProductListItem id="1" img="img.png" name="Prod" price={1} />
      </ul>,
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Prod');
  });

  it('calls onAdd handler', () => {
    const onAdd = vi.fn();
    render(
      <ul>
        <ProductListItem id="1" img="img.png" name="Prod" price={1} onAdd={onAdd} />
      </ul>,
    );
    fireEvent.click(screen.getByLabelText('Añadir'));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const { container } = render(
      <ul>
        <ProductListItem id="1" img="img.png" name="Prod" price={1} />
      </ul>,
    );
    expect(container).toMatchSnapshot();
  });
});
