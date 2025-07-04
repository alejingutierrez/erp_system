import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders an unchecked checkbox by default', () => {
    render(<Checkbox label="Accept" intent="secondary" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('toggles checked state on click', () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} label="Opt in" />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(handleChange).toHaveBeenCalled();
  });

  it('respects controlled checked prop', () => {
    const { rerender } = render(<Checkbox checked={false} readOnly label="Ctrl" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    rerender(<Checkbox checked readOnly label="Ctrl" />);
    expect(checkbox).toBeChecked();
  });

  it('applies disabled attribute', () => {
    render(<Checkbox disabled label="Disabled" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('sets indeterminate state', () => {
    render(<Checkbox indeterminate label="Mixed" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.getAttribute('aria-checked')).toBe('mixed');
  });
});
