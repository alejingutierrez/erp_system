import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PaginationControls } from './PaginationControls';

describe('PaginationControls', () => {
  it('renders page buttons', () => {
    render(<PaginationControls currentPage={2} totalPages={5} />);
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
  });

  it('disables prev/next on edges', () => {
    render(<PaginationControls currentPage={1} totalPages={3} />);
    const prev = screen.getByLabelText('Previous page');
    expect(prev).toBeDisabled();
    const next = screen.getByLabelText('Next page');
    expect(next).not.toBeDisabled();
  });

  it('calls onPageChange when number clicked', () => {
    const handle = vi.fn();
    render(
      <PaginationControls currentPage={1} totalPages={3} onPageChange={handle} />,
    );
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    expect(handle).toHaveBeenCalledWith(2);
  });

  it('shows dots when many pages', () => {
    render(
      <PaginationControls currentPage={5} totalPages={20} siblings={1} />,
    );
    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
  });

  it('shows dots when pages exceed five', () => {
    render(<PaginationControls currentPage={3} totalPages={6} />);
    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
  });

  it('uses square buttons', () => {
    render(<PaginationControls currentPage={1} totalPages={3} />);
    const btn = screen.getByRole('button', { name: '1' });
    expect(btn.className).toMatch(/w-8/);
    expect(btn.className).toMatch(/h-8/);
  });
});
