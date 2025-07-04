import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Radio } from './Radio';

describe('Radio', () => {
  it('renders radio with provided name', () => {
    render(<Radio name="group" label="One" />);
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('name', 'group');
  });

  it('toggles selection on click and triggers onChange', () => {
    const onChange = vi.fn();
    render(<Radio name="group" label="Opt" onChange={onChange} />);
    const radio = screen.getByRole('radio');
    fireEvent.click(radio);
    expect(radio).toBeChecked();
    expect(onChange).toHaveBeenCalled();
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
});
