import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FileGallery, type FileItem } from './FileGallery';

const items: FileItem[] = [
  { id: '1', name: 'a.png', url: 'a.png', type: 'image' },
  { id: '2', name: 'b.pdf', url: 'b.pdf', type: 'doc' },
];

describe('FileGallery', () => {
  it('calls onPreview when item clicked', () => {
    const onPreview = vi.fn();
    render(<FileGallery items={items} onPreview={onPreview} />);
    fireEvent.click(screen.getByRole('button', { name: /a.png/ }));
    expect(onPreview).toHaveBeenCalledWith(items[0]);
  });

  it('calls onDelete after confirmation', () => {
    const onDelete = vi.fn();
    render(<FileGallery items={items} onDelete={onDelete} />);
    const deleteButtons = screen.getAllByLabelText('Eliminar archivo');
    fireEvent.click(deleteButtons[0]);
    fireEvent.click(screen.getByText('Confirmar'));
    expect(onDelete).toHaveBeenCalledWith(items[0]);
  });
});
