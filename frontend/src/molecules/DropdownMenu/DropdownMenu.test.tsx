import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DropdownMenu } from './DropdownMenu';

const items = [
  { label: 'Edit', iconName: 'Edit' as const },
  { label: 'Delete', iconName: 'Trash2' as const },
];

describe('DropdownMenu', () => {
  it('opens when trigger clicked', () => {
    render(<DropdownMenu triggerLabel="Open" items={items} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('calls onSelect and closes', () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu triggerLabel="Menu" items={items} onSelect={onSelect} />,
    );
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Edit'));
    expect(onSelect).toHaveBeenCalledWith({ ...items[0], id: 0 });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('does not select disabled item', () => {
    const onSelect = vi.fn();
    const disabled = [{ label: 'Edit', disabled: true }];
    render(
      <DropdownMenu triggerLabel="Menu" items={disabled} onSelect={onSelect} />,
    );
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Edit'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('closes when clicking outside', () => {
    render(<DropdownMenu triggerLabel="Menu" items={items} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.click(document.body);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('calls onSelectedIdChange when item selected', () => {
    const onChange = vi.fn();
    render(
      <DropdownMenu
        triggerLabel="Menu"
        items={[{ label: 'Edit', id: 'edit' }]}
        onSelectedIdChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Edit'));
    expect(onChange).toHaveBeenCalledWith('edit');
  });

  it('highlights selected item', () => {
    render(
      <DropdownMenu
        triggerLabel="Menu"
        items={[{ label: 'Edit', id: 'edit' }, { label: 'Delete', id: 'del' }]}
        selectedId="edit"
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    const item = screen.getByText('Edit');
    expect(item.parentElement).toHaveClass('bg-muted');
  });
});
