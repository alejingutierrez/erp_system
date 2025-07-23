import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DropdownSelect } from './DropdownSelect';

const options = ['A', 'B', 'C'];

describe('DropdownSelect', () => {
  it('renders placeholder', () => {
    render(<DropdownSelect options={options} placeholder="choose" />);
    expect(screen.getByPlaceholderText('choose')).toBeInTheDocument();
  });

  it('opens and closes the menu', () => {
    render(<DropdownSelect options={options} placeholder="sel" />);
    const input = screen.getByPlaceholderText('sel');
    fireEvent.click(input);
    expect(screen.getByRole('list')).toBeInTheDocument();
    fireEvent.click(document.body);
  });

  it('calls onChange when option selected', () => {
    const handleChange = vi.fn();
    render(
      <DropdownSelect options={options} onChange={handleChange} />,
    );
    fireEvent.click(screen.getByRole('textbox'));
    fireEvent.click(screen.getByText('B'));
    expect(handleChange).toHaveBeenCalledWith('B');
  });

  it('updates display when uncontrolled', () => {
    render(<DropdownSelect options={options} />);
    fireEvent.click(screen.getByRole('textbox'));
    fireEvent.click(screen.getByText('C'));
    expect(screen.getByDisplayValue('C')).toBeInTheDocument();
  });

  it('shows search input when searchable', () => {
    render(<DropdownSelect options={options} searchable />);
    fireEvent.click(screen.getByRole('textbox'));
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
  });
});
