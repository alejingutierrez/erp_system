import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ActionMenu } from './ActionMenu';
import { MoreHorizontal } from 'lucide-react';

const options = [
  { label: 'Edit', iconName: 'Edit' },
  { label: 'Delete', iconName: 'Trash2' },
];

describe('ActionMenu', () => {
  it('opens and closes menu', () => {
    render(
      <ActionMenu options={options}>
        <MoreHorizontal />
      </ActionMenu>
    );
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.click(trigger);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('calls onOptionSelect', () => {
    const onSelect = vi.fn();
    render(
      <ActionMenu options={options} onOptionSelect={onSelect}>
        <MoreHorizontal />
      </ActionMenu>
    );
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Delete'));
    expect(onSelect).toHaveBeenCalledWith(options[1], 1);
  });

  it('does not open when disabled', () => {
    render(
      <ActionMenu options={options} disabled>
        <MoreHorizontal />
      </ActionMenu>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
