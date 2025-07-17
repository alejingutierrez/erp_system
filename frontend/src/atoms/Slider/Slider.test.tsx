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

  it('shows indicator while dragging', () => {
    render(<Slider defaultValue={20} />);
    const slider = screen.getByRole('slider');
    fireEvent.pointerDown(slider);
    const indicator = screen.getByTestId('slider-indicator');
    expect(indicator).toBeInTheDocument();
    expect(indicator.style.backgroundColor).toBe('hsl(var(--slider-color))');
    expect(indicator.style.color).toBe('hsl(var(--slider-foreground))');
    fireEvent.pointerUp(slider);
    expect(screen.queryByTestId('slider-indicator')).not.toBeInTheDocument();
  });

  it('updates value when track is clicked', () => {
    const handleChange = vi.fn();
    render(<Slider onChange={handleChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.click(slider, { clientX: 10 });
    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Slider disabled />);
    expect(screen.getByRole('slider')).toBeDisabled();
  });
});
