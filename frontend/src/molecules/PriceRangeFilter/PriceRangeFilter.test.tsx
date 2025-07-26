import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PriceRangeFilter } from './PriceRangeFilter';

describe('PriceRangeFilter', () => {
  it('syncs value prop to inputs', () => {
    const { rerender } = render(
      <PriceRangeFilter min={0} max={100} value={[20, 80]} onChange={() => {}} />,
    );
    rerender(
      <PriceRangeFilter min={0} max={100} value={[30, 70]} onChange={() => {}} />,
    );
    expect(
      (
        screen.getByRole('spinbutton', { name: 'Precio mínimo' }) as HTMLInputElement
      ).value,
    ).toBe('30');
    expect(
      (
        screen.getByRole('spinbutton', { name: 'Precio máximo' }) as HTMLInputElement
      ).value,
    ).toBe('70');
  });

  it('clamps values entered outside range', () => {
    const handle = vi.fn();
    render(
      <PriceRangeFilter min={0} max={100} value={[10, 90]} onChange={handle} />,
    );
    const input = screen.getByRole('spinbutton', { name: 'Precio mínimo' }) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '-10' } });
    expect(handle).toHaveBeenCalledWith([0, 90]);
  });
});
