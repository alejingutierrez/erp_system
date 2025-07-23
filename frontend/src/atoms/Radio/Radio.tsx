
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// == Variants ==
const radioVariants = cva(
  [
    'peer appearance-none rounded-full border border-border bg-background transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
    'disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
  ].join(' '),
  {
    variants: {
      intent: {
        primary: '',
        secondary: '',
        tertiary: '',
        quaternary: '',
        success: '',
      },
      size: {
        sm: 'h-4 w-4', // 16px
        md: 'h-5 w-5', // 20px
        lg: 'h-6 w-6', // 24px
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  },
);

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>,
    VariantProps<typeof radioVariants> {
  label?: string;
  /**
   * Allows toggling the radio off when it is clicked while already selected.
   * Useful when the radio is used on its own and deselection is desired.
   * Defaults to `false` to preserve native radio behaviour.
   */
  allowDeselect?: boolean;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      size,
      intent = 'primary',
      label,
      children,
      id,
      checked,
      defaultChecked,
      onChange,
      allowDeselect = false,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? React.useId();

    const isControlled = checked !== undefined;
    const useStateInternally = allowDeselect && !isControlled;
    const [internalChecked, setInternalChecked] = React.useState(
      defaultChecked ?? false,
    );

    const currentChecked = isControlled
      ? checked
      : useStateInternally
      ? internalChecked
      : undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (useStateInternally) {
        setInternalChecked(e.target.checked);
      }

      onChange?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      if (allowDeselect && currentChecked) {
        e.preventDefault();

        if (useStateInternally) {
          setInternalChecked(false);
        }

        onChange?.({
          ...e,
          target: { ...e.currentTarget, checked: false },
        } as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    };

    return (
      <label
        htmlFor={inputId}
        className={cn('inline-flex items-center gap-3 cursor-pointer select-none', {
          'opacity-50 cursor-not-allowed': props.disabled,
        })}
      >
        <div className="relative inline-flex items-center justify-center">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            checked={isControlled || useStateInternally ? currentChecked : undefined}
            defaultChecked={!isControlled && !useStateInternally ? defaultChecked : undefined}
            onChange={handleChange}
            onClick={handleClick}
            className={cn(
              radioVariants({ size, intent }),
              'peer',
              className,
            )}
            {...props}
          />
          {/* Inner dot */}
          <span
            className={cn(
              'pointer-events-none absolute rounded-full transition-opacity',
              {
                'h-2 w-2': size === 'sm', // 8px
                'h-2.5 w-2.5': size === 'md', // 10px
                'h-3.5 w-3.5': size === 'lg', // 14px
                'bg-primary': intent === 'primary',
                'bg-secondary': intent === 'secondary',
                'bg-tertiary': intent === 'tertiary',
                'bg-quaternary': intent === 'quaternary',
                'bg-success': intent === 'success',
              },
              'opacity-0 peer-checked:opacity-100',
            )}
          />
        </div>
        {label && <span className="text-sm">{label}</span>}
        {!label && children}
      </label>
    );
  },
);
Radio.displayName = 'Radio';

export { Radio, radioVariants };
