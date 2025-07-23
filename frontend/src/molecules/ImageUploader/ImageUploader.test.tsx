import { render, screen, fireEvent } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { ImageUploader } from './ImageUploader';

const createFile = (name: string) => new File(['hello'], name, { type: 'image/png' });

beforeAll(() => {
  (global as any).URL.createObjectURL = vi.fn(() => 'preview');
  (global as any).URL.revokeObjectURL = vi.fn();
});

describe('ImageUploader', () => {
  it('renders upload button', () => {
    render(<ImageUploader />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows preview after selecting image', () => {
    render(<ImageUploader />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [createFile('a.png')] } });
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('removes image when clicking delete', () => {
    render(<ImageUploader />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [createFile('a.png')] } });
    fireEvent.click(screen.getByRole('button', { name: /eliminar/i }));
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('respects maxImagenes', () => {
    render(<ImageUploader multiple maxImagenes={1} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [createFile('a.png'), createFile('b.png')] } });
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });
});
