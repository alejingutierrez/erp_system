import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Icon } from '@/atoms/Icon';
import { Text } from '@/atoms/Text';

const circleVariants = cva(
  'flex items-center justify-center w-8 h-8 rounded-full border text-sm font-medium transition-colors',
  {
    variants: {
      state: {
        completed: 'bg-success text-success-foreground border-success',
        current: 'bg-primary text-primary-foreground border-primary',
        pending: 'text-muted-foreground border-border',
      },
      clickable: {
        true: 'cursor-pointer hover:bg-muted',
        false: '',
      },
    },
    defaultVariants: {
      state: 'pending',
      clickable: false,
    },
  },
);

export interface StepIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof circleVariants> {
  /** Total number of steps */
  totalSteps: number;
  /** Current active step (1-indexed) */
  currentStep: number;
  /** Labels for each step */
  labels?: string[];
  /** Allow clicking on completed steps */
  clickable?: boolean;
  /** Callback when a step is clicked */
  onStepClick?: (step: number) => void;
}

export const StepIndicator = React.forwardRef<HTMLDivElement, StepIndicatorProps>(
  (
    {
      totalSteps,
      currentStep,
      labels,
      clickable = false,
      onStepClick,
      className,
      ...props
    },
    ref,
  ) => {
    const safeTotal = Math.min(Math.max(totalSteps, 1), 15);
    const safeCurrent = Math.min(Math.max(currentStep, 1), safeTotal);

    const steps = Array.from({ length: safeTotal }, (_, i) => i + 1);
    const safeLabels = Array.isArray(labels) ? labels.slice(0, safeTotal) : [];
    const finalLabels =
      safeLabels.length === safeTotal
        ? safeLabels
        : steps.map((n) => `Paso ${n}`);

    return (
      <div ref={ref} className={cn('flex items-center w-full', className)} {...props}>
        {steps.map((step, index) => {
          const state =
            step < safeCurrent ? 'completed' : step === safeCurrent ? 'current' : 'pending';
          const isClickable = clickable && step < safeCurrent;
          const handleClick = () => {
            if (isClickable) onStepClick?.(step);
          };
          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className={circleVariants({ state, clickable: isClickable })}
                  onClick={handleClick}
                  disabled={!isClickable}
                >
                  {state === 'completed' ? (
                    <Icon name="Check" size="sm" aria-hidden="true" />
                  ) : (
                    step
                  )}
                </button>
                <Text as="span" size="sm" className="mt-1 text-center">
                  {finalLabels[index]}
                </Text>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-2 flex-1 border-t',
                    step < safeCurrent ? 'border-success' : 'border-border',
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  },
);
StepIndicator.displayName = 'StepIndicator';

export { circleVariants as stepIndicatorCircleVariants };
