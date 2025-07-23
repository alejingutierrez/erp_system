import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TagInput } from './TagInput';

describe('TagInput', () => {
  it('renders initial tags', () => {
    render(<TagInput tags={['one', 'two']} />);
    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
  });

  it('adds tag on enter', () => {
    render(<TagInput placeholder="add" />);
    const input = screen.getByPlaceholderText('add');
    fireEvent.change(input, { target: { value: 'new' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('new')).toBeInTheDocument();
  });

  it('persists added tags after rerender when uncontrolled', () => {
    const { rerender } = render(<TagInput placeholder="add" />);
    const input = screen.getByPlaceholderText('add');
    fireEvent.change(input, { target: { value: 'stay' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('stay')).toBeInTheDocument();
    rerender(<TagInput placeholder="add" />);
    expect(screen.getByText('stay')).toBeInTheDocument();
  });

  it('removes tag when close clicked', () => {
    render(<TagInput tags={['remove']} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('remove')).not.toBeInTheDocument();
  });

  it('respects maxTags', () => {
    render(<TagInput maxTags={1} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    fireEvent.change(input, { target: { value: 'b' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.queryByText('b')).not.toBeInTheDocument();
  });

  it('removes last tag with backspace', () => {
    render(<TagInput tags={['last']} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Backspace' });
    expect(screen.queryByText('last')).not.toBeInTheDocument();
  });
});
