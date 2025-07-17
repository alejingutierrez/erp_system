import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FileUpload } from './FileUpload';

const createFile = (name: string) => new File(['hello'], name, { type: 'text/plain' });

describe('FileUpload', () => {
  it('renders trigger button', () => {
    render(<FileUpload />);
    expect(screen.getByRole('button', { name: /seleccionar archivo/i })).toBeInTheDocument();
  });

  it('displays selected file name', () => {
    render(<FileUpload />);
    const input = document.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [createFile('test.txt')] } });
    expect(screen.getByText('test.txt')).toBeInTheDocument();
  });

  it('shows count when multiple files selected', () => {
    render(<FileUpload multiple />);
    const input = document.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [createFile('a.txt'), createFile('b.txt')] } });
    expect(screen.getByText('2 archivos seleccionados')).toBeInTheDocument();
  });

  it('calls onChange handler', () => {
    const handleChange = vi.fn();
    render(<FileUpload onChange={handleChange} />);
    const input = document.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [createFile('file.pdf')] } });
    expect(handleChange).toHaveBeenCalled();
  });
});
