import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { FileUploader } from './FileUploader';

const createFile = (name: string, type = 'image/png') => new File(['hello'], name, { type });

const dropFile = (node: HTMLElement, file: File) => {
  const data = { files: [file] } as DataTransfer;
  fireEvent.drop(node, { dataTransfer: data });
};

beforeAll(() => {
  (global as any).URL.createObjectURL = vi.fn(() => "preview");
});
describe('FileUploader', () => {
  it('renders label text', () => {
    render(<FileUploader label="Upload" />);
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

  it('shows image preview after selecting file', () => {
    render(<FileUploader />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [createFile('img.png')] } });
    expect(screen.getByAltText('preview')).toBeInTheDocument();
  });

  it('removes file when clicking remove button', () => {
    render(<FileUploader />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [createFile('img.png')] } });
    fireEvent.click(screen.getByLabelText('Eliminar archivo'));
    expect(screen.queryByAltText('preview')).not.toBeInTheDocument();
  });

  it('calls onDrop when file dropped', () => {
    const handleDrop = vi.fn();
    render(<FileUploader onDrop={handleDrop} />);
    const area = screen.getByRole('button');
    dropFile(area, createFile('img.png'));
    expect(handleDrop).toHaveBeenCalled();
  });
});
