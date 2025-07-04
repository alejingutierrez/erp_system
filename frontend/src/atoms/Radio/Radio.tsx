
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
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, size, intent = 'primary', label, children, id, checked, onChange, ...props }, ref) => {
    const inputId = id ?? React.useId();

    const handleClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
      if (checked) {
        e.preventDefault();
        const syntheticEvent = {
          ...e,
          target: { ...e.target, checked: false },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange?.(syntheticEvent);
      }
    };

    return (
      <label
        htmlFor={inputId}
        className={cn('inline-flex items-center gap-3 cursor-pointer select-none', {
          'opacity-50 cursor-not-allowed': props.disabled,
        })}
      >
        <span
          className={cn(
            'relative inline-flex items-center justify-center',
            'border border-border rounded-full transition-colors',
            {
              'h-4 w-4': size === 'sm',
              'h-5 w-5': size === 'md',
              'h-6 w-6': size === 'lg',
              'border-primary': checked && intent === 'primary',
              'border-secondary': checked && intent === 'secondary',
              'border-tertiary': checked && intent === 'tertiary',
              'border-quaternary': checked && intent === 'quaternary',
              'border-success': checked && intent === 'success',
            },
          )}
        >
          <input
            ref={ref}
            id={inputId}
            type="radio"
            checked={checked}
            onChange={onChange}
            onClick={handleClick}
            className={cn('absolute inset-0 w-full h-full cursor-pointer opacity-0', className)}
            {...props}
          />
          {/* Inner dot */}
          <span
            className={cn(
              'rounded-full transition-all',
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
              checked ? 'opacity-100' : 'opacity-0',
            )}
          />
        </span>
        {label && <span className="text-sm">{label}</span>}
        {!label && children}
      </label>
    );
  },
);
Radio.displayName = 'Radio';

export { Radio, radioVariants };
