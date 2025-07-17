import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders with default classes', () => {
    render(<Input placeholder="name" />);
    const input = screen.getByPlaceholderText('name');
    expect(input).toHaveClass('py-2');
    expect(input).toHaveClass('px-3');
    expect(input).toHaveClass('text-base');
  });

  it('renders passed attributes', () => {
    render(<Input value="John" onChange={() => {}} />);
    const input = screen.getByDisplayValue('John');
    expect(input).toBeInTheDocument();
  });

  it('applies size variants', () => {
    const { rerender } = render(<Input size="sm" placeholder="s" />);
    expect(screen.getByPlaceholderText('s')).toHaveClass('py-1');

    rerender(<Input size="lg" placeholder="l" />);
    expect(screen.getByPlaceholderText('l')).toHaveClass('py-3');
  });

  it('shows error state', () => {
    render(<Input error placeholder="err" />);
    const input = screen.getByPlaceholderText('err');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input.className).toContain('border-destructive');
  });

  it('disables the field', () => {
    render(<Input disabled placeholder="d" />);
    const input = screen.getByPlaceholderText('d');
    expect(input).toBeDisabled();
  });

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'hi' } });
    expect(handleChange).toHaveBeenCalled();
    expect((input as HTMLInputElement).value).toBe('hi');
  });

  it('renders floating label', () => {
    render(<Input label="Email" id="email" />);
    expect(screen.getByText('Email')).toHaveAttribute('for', 'email');
  });

  it('positions label correctly with left icon', () => {
    const LeftIcon = () => <svg data-testid="icon" />;
    render(<Input label="User" LeftIcon={LeftIcon} />);
    const label = screen.getByText('User');
    expect(label.className).toContain('left-10');
  });

  it('shows character count', () => {
    render(<Input showCharCount label="Bio" maxLength={10} />);
    const input = screen.getByLabelText('Bio');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(screen.getByText('3/10')).toBeInTheDocument();
  });
});
