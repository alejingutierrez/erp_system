import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DateRangePicker } from './DateRangePicker';

describe('DateRangePicker', () => {
  it('cambia rango', async () => {
    vi.setSystemTime(new Date(2024, 0, 1));
    const user = userEvent.setup();
    const handle = vi.fn();
    render(<DateRangePicker onChange={handle} />);
    const inputs = screen.getAllByRole('textbox');
    await user.click(inputs[0]);
    await user.click(screen.getByRole('cell', { name: '10' }));
    await user.click(screen.getByRole('cell', { name: '15' }));
    expect(handle).toHaveBeenCalled();
    const range = handle.mock.calls[0][0];
    expect(range.start).toEqual(new Date(2024, 0, 10));
    expect(range.end).toEqual(new Date(2024, 0, 15));
    vi.useRealTimers();
  });

  it('navegación teclado', async () => {
    vi.setSystemTime(new Date(2024, 0, 1));
    const user = userEvent.setup();
    render(<DateRangePicker />);
    const inputs = screen.getAllByRole('textbox');
    await user.click(inputs[0]);
    const cells = screen.getAllByRole('cell');
    cells[0].focus();
    await user.keyboard('{arrowright}');
    expect(cells[1]).toHaveFocus();
    vi.useRealTimers();
  });
});
