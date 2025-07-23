import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StepIndicator } from './StepIndicator';

describe('StepIndicator', () => {
  it('renders the correct number of steps', () => {
    render(
      <StepIndicator totalSteps={3} currentStep={2} labels={['A', 'B', 'C']} />,
    );
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('shows check icon for completed steps', () => {
    render(<StepIndicator totalSteps={2} currentStep={2} />);
    const first = screen.getAllByRole('button')[0];
    expect(first.querySelector('svg')).toBeInTheDocument();
  });

  it('calls onStepClick when clicking previous step', () => {
    const handle = vi.fn();
    render(
      <StepIndicator totalSteps={3} currentStep={2} clickable onStepClick={handle} />,
    );
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(handle).toHaveBeenCalledWith(1);
  });

  it('ignores click on current step', () => {
    const handle = vi.fn();
    render(
      <StepIndicator totalSteps={3} currentStep={2} clickable onStepClick={handle} />,
    );
    fireEvent.click(screen.getAllByRole('button')[1]);
    expect(handle).not.toHaveBeenCalled();
  });

  it('caps totalSteps at 15', () => {
    render(<StepIndicator totalSteps={20} currentStep={1} />);
    expect(screen.getAllByRole('button')).toHaveLength(15);
  });

  it('clamps currentStep to totalSteps', () => {
    render(<StepIndicator totalSteps={3} currentStep={10} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[buttons.length - 1].textContent).toBe('3');
  });

  it('handles null labels gracefully', () => {
    render(<StepIndicator totalSteps={2} currentStep={1} labels={null as any} />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
});
