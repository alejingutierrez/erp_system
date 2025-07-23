import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Radio } from './Radio';

describe('Radio', () => {
  it('renders radio with provided name', () => {
    render(<Radio name="group" label="One" />);
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('name', 'group');
  });

  it('allows deselecting when allowDeselect is true', () => {
    const onChange = vi.fn();
    render(<Radio label="Opt" allowDeselect onChange={onChange} />);
    const radio = screen.getByRole('radio');
    fireEvent.click(radio);
    expect(radio).toBeChecked();
    fireEvent.click(radio);
    expect(radio).not.toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('only one radio in group is selected', () => {
    render(
      <>
        <Radio name="g" value="a" label="A" />
        <Radio name="g" value="b" label="B" />
      </>,
    );
    const [first, second] = screen.getAllByRole('radio');
    fireEvent.click(first);
    expect(first).toBeChecked();
    expect(second).not.toBeChecked();
    fireEvent.click(second);
    expect(first).not.toBeChecked();
    expect(second).toBeChecked();
  });

  it('honors disabled prop', () => {
    render(<Radio disabled label="D" />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeDisabled();
  });

  it('supports defaultChecked', () => {
    render(<Radio label="Default" defaultChecked />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeChecked();
  });

  it('respects controlled checked prop', () => {
    const { rerender } = render(
      <Radio label="Ctrl" checked={false} onChange={() => {}} />,
    );
    const radio = screen.getByRole('radio');
    expect(radio).not.toBeChecked();

    rerender(<Radio label="Ctrl" checked onChange={() => {}} />);
    expect(radio).toBeChecked();
  });
});
