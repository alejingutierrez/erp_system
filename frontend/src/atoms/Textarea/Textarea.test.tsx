import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders with default classes and rows', () => {
    render(<Textarea placeholder="text" />);
    const textarea = screen.getByPlaceholderText('text');
    expect(textarea).toHaveClass('py-2');
    expect(textarea).toHaveClass('px-3');
    expect(textarea).toHaveClass('text-base');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  it('renders passed attributes', () => {
    render(<Textarea value="hello" onChange={() => {}} />);
    const textarea = screen.getByDisplayValue('hello');
    expect(textarea).toBeInTheDocument();
  });

  it('applies size variants', () => {
    const { rerender } = render(<Textarea size="sm" placeholder="s" />);
    expect(screen.getByPlaceholderText('s')).toHaveClass('py-1');
    expect(screen.getByPlaceholderText('s')).toHaveAttribute('rows', '3');

    rerender(<Textarea size="lg" placeholder="l" />);
    expect(screen.getByPlaceholderText('l')).toHaveClass('py-3');
    expect(screen.getByPlaceholderText('l')).toHaveAttribute('rows', '8');
  });

  it('shows error state', () => {
    render(<Textarea error placeholder="err" />);
    const textarea = screen.getByPlaceholderText('err');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea.className).toContain('border-destructive');
  });

  it('supports ghost variant', () => {
    render(<Textarea variant="ghost" placeholder="g" />);
    const textarea = screen.getByPlaceholderText('g');
    expect(textarea.className).toContain('border-none');
  });

  it('disables the field', () => {
    render(<Textarea disabled placeholder="d" />);
    const textarea = screen.getByPlaceholderText('d');
    expect(textarea).toBeDisabled();
  });

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'hi' } });
    expect(handleChange).toHaveBeenCalled();
    expect((textarea as HTMLTextAreaElement).value).toBe('hi');
  });

  it('renders floating label', () => {
    render(<Textarea label="Notes" id="notes" />);
    expect(screen.getByText('Notes')).toHaveAttribute('for', 'notes');
  });

  it('shows character count', () => {
    render(<Textarea showCharCount label="Comment" maxLength={10} />);
    const textarea = screen.getByLabelText('Comment');
    fireEvent.change(textarea, { target: { value: 'abc' } });
    expect(screen.getByText('3/10')).toBeInTheDocument();
  });
});
