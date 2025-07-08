import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders with default attributes', () => {
    render(<Slider min={0} max={100} defaultValue={50} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
    expect(slider).toHaveValue('50');
  });

  it('applies size variants', () => {
    const { rerender } = render(<Slider size="sm" />);
    const slider = screen.getByRole('slider');
    expect(slider.className).toContain('slider-sm');

    rerender(<Slider size="lg" />);
    expect(slider.className).toContain('slider-lg');
  });

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<Slider onChange={handleChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '30' } });
    expect(handleChange).toHaveBeenCalled();
    expect(slider).toHaveValue('30');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Slider disabled />);
    expect(screen.getByRole('slider')).toBeDisabled();
  });
});
