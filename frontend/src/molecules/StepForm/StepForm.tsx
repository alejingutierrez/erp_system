import * as React from 'react';
import { StepIndicator } from '@/molecules/StepIndicator';
import { Button } from '@/atoms/Button';
import { cn } from '@/lib/utils';

export interface Step {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface StepFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /** Steps configuration */
  steps: Step[];
  /** Current active step (0-indexed) */
  current: number;
  /** Validate the current step before advancing */
  validateStep?: (idx: number) => boolean | Promise<boolean>;
  /** Called when the step changes */
  onChangeStep: (idx: number) => void;
  /** Called when submitting the final step */
  onSubmit: (values: unknown) => void;
}

export const StepForm = React.forwardRef<HTMLFormElement, StepFormProps>(
  (
    { steps, current, validateStep, onChangeStep, onSubmit, className, ...props },
    ref,
  ) => {
    const formRef = React.useRef<HTMLFormElement>(null);
    React.useImperativeHandle(ref, () => formRef.current as HTMLFormElement);

    const total = steps.length;
    const safeCurrent = Math.min(Math.max(current, 0), total - 1);

    const handlePrev = () => {
      if (safeCurrent > 0) onChangeStep(safeCurrent - 1);
    };

    const getValues = () => {
      const data = new FormData(formRef.current!);
      return Object.fromEntries(data.entries());
    };

    const handleNext = async () => {
      const isValid = (await validateStep?.(safeCurrent)) ?? true;
      if (!isValid) return;

      if (safeCurrent < total - 1) {
        onChangeStep(safeCurrent + 1);
      } else {
        onSubmit(getValues());
      }
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      void handleNext();
    };

    return (
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={cn('step-form space-y-4', className)}
        {...props}
      >
        <StepIndicator
          totalSteps={total}
          currentStep={safeCurrent + 1}
          labels={steps.map((s) => s.label)}
          clickable
          onStepClick={(idx) => onChangeStep(idx - 1)}
        />

        <section className="step-content">{steps[safeCurrent].content}</section>

        <footer className="actions flex justify-between">
          <Button
            type="button"
            variant="outline"
            intent="secondary"
            onClick={handlePrev}
            disabled={safeCurrent === 0}
            aria-disabled={safeCurrent === 0}
          >
            Prev
          </Button>
          <Button type="submit">
            {safeCurrent < total - 1 ? 'Next' : 'Submit'}
          </Button>
        </footer>
      </form>
    );
  },
);
StepForm.displayName = 'StepForm';

