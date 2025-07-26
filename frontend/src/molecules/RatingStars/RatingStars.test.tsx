import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { RatingStars } from './RatingStars';

describe('RatingStars', () => {
  it('changes value on click', () => {
    const handle = vi.fn();
    render(<RatingStars value={2} onChange={handle} />);
    const third = screen.getByLabelText('3 de 5');
    fireEvent.click(third);
    expect(handle).toHaveBeenCalledWith(3);
  });

  it('navigates with keyboard', () => {
    const handle = vi.fn();
    render(<RatingStars value={2} onChange={handle} />);
    const second = screen.getByLabelText('2 de 5');
    second.focus();
    fireEvent.keyDown(second, { key: 'ArrowRight' });
    expect(handle).toHaveBeenCalledWith(3);
  });
});
