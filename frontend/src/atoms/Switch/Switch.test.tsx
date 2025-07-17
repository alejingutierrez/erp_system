import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { Switch } from './Switch';

describe('Switch', () => {
  it('should render correctly', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('should be checked when the checked prop is true', () => {
    render(<Switch checked={true} onCheckedChange={() => {}} />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeChecked();
    expect(switchElement.className).toContain('bg-primary');
  });

  it('should not be checked when the checked prop is false', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();
    expect(switchElement.className).toContain('bg-gray-400');
  });

  it('should call onCheckedChange when clicked', async () => {
    const onCheckedChange = vi.fn();
    render(<Switch checked={false} onCheckedChange={onCheckedChange} />);
    const switchElement = screen.getByRole('switch');
    await userEvent.click(switchElement);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('applies intent color when checked', () => {
    render(<Switch checked={true} intent="secondary" onCheckedChange={() => {}} />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement.className).toContain('bg-secondary');
  });

  it('should toggle state when Space key is pressed', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch checked={false} onCheckedChange={onCheckedChange} />);
    const switchElement = screen.getByRole('switch');

    switchElement.focus();
    expect(switchElement).toHaveFocus();

    await user.keyboard('{space}');

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('should not call onCheckedChange when disabled', async () => {
    const onCheckedChange = vi.fn();
    render(<Switch checked={false} onCheckedChange={onCheckedChange} disabled />);
    const switchElement = screen.getByRole('switch');
    await userEvent.click(switchElement);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('should have disabled attribute when disabled prop is true', () => {
    render(<Switch checked={false} onCheckedChange={() => {}} disabled />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });
});
