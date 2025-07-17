import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FilterTagList } from './FilterTagList';

describe('FilterTagList', () => {
  it('renders all filters as tags', () => {
    render(<FilterTagList filters={['A', 'B']} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('calls onRemove when a tag is closed', () => {
    const handleRemove = vi.fn();
    render(<FilterTagList filters={['A']} onRemove={handleRemove} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleRemove).toHaveBeenCalledWith('A');
  });

  it('calls onClearAll when clicking clear button', () => {
    const handleClear = vi.fn();
    render(
      <FilterTagList filters={['A']} showClearAll onClearAll={handleClear} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Quitar filtros' }));
    expect(handleClear).toHaveBeenCalled();
  });
});
