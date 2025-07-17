import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EditableField } from './EditableField';

describe('EditableField', () => {
  it('renders initial text', () => {
    render(<EditableField initialValue="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('enters edit mode and saves new value', () => {
    const handleSave = vi.fn();
    render(<EditableField initialValue="Hello" onSave={handleSave} />);
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'World' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByText('World')).toBeInTheDocument();
    expect(handleSave).toHaveBeenCalledWith('World');
  });

  it('cancels edits', () => {
    const handleCancel = vi.fn();
    render(<EditableField initialValue="Hello" onCancel={handleCancel} />);
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'World' } });
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(handleCancel).toHaveBeenCalled();
  });

  it('respects editable prop', () => {
    render(<EditableField initialValue="Hi" editable />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
