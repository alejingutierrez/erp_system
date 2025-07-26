import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StepForm, Step } from './StepForm';

const steps: Step[] = [
  { id: 'a', label: 'A', content: <div>Step A</div> },
  { id: 'b', label: 'B', content: <div>Step B</div> },
];

describe('StepForm', () => {
  it('changes step when clicking next', async () => {
    const handle = vi.fn();
    render(
      <StepForm steps={steps} current={0} onChangeStep={handle} onSubmit={vi.fn()} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(handle).toHaveBeenCalledWith(1);
  });

  it('submits on last step', async () => {
    const submit = vi.fn();
    render(
      <StepForm
        steps={steps}
        current={1}
        onChangeStep={vi.fn()}
        onSubmit={submit}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(submit).toHaveBeenCalled();
  });

  it('stops when validateStep fails', async () => {
    const validate = vi.fn(() => false);
    const handle = vi.fn();
    render(
      <StepForm
        steps={steps}
        current={0}
        validateStep={validate}
        onChangeStep={handle}
        onSubmit={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(handle).not.toHaveBeenCalled();
    expect(validate).toHaveBeenCalled();
  });
});
