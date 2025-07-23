import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CustomerCard } from './CustomerCard';

describe('CustomerCard', () => {
  it('renders name and secondary info', () => {
    render(<CustomerCard nombre="Juan" infoSecundaria="juan@example.com" />);
    expect(screen.getByText('Juan')).toBeInTheDocument();
    expect(screen.getByText('juan@example.com')).toBeInTheDocument();
  });

  it('shows badge when nivel provided', () => {
    render(<CustomerCard nombre="Ana" nivel="VIP" />);
    expect(screen.getByText('VIP')).toBeInTheDocument();
  });

  it('calls onSelect when card clicked', () => {
    const onSelect = vi.fn();
    render(<CustomerCard nombre="Ana" onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('calls onAction when action menu is opened', () => {
    const onAction = vi.fn();
    render(
      <CustomerCard
        nombre="Ana"
        mostrarAccion
        actionOptions={[{ label: 'Edit', iconName: 'Edit' }]}
        onAction={onAction}
      />,
    );
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('renders action menu when options provided', () => {
    render(
      <CustomerCard
        nombre="Ana"
        mostrarAccion
        actionOptions={[{ label: 'Edit', iconName: 'Edit' }]}
      />,
    );
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});
