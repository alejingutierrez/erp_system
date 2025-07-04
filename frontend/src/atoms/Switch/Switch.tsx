import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from "@/lib/utils";

const switchVariants = cva(
  'relative inline-flex flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-12',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const thumbVariants = cva(
  'pointer-events-none inline-block transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
      checked: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { size: 'sm', checked: true, class: 'translate-x-4' },
      { size: 'sm', checked: false, class: 'translate-x-0' },
      { size: 'md', checked: true, class: 'translate-x-5' },
      { size: 'md', checked: false, class: 'translate-x-0' },
      { size: 'lg', checked: true, class: 'translate-x-5' },
      { size: 'lg', checked: false, class: 'translate-x-0' },
    ],
    defaultVariants: {
      size: 'md',
    },
  },
);

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>,
    VariantProps<typeof switchVariants> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, size, checked, onCheckedChange, ...props }, ref) => {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        onKeyUp={(e) => {
          const key = e.key.toLowerCase();
          if (key === ' ' || key === 'space' || key === 'spacebar') {
            e.preventDefault();
            onCheckedChange(!checked);
          }
        }}
        onKeyDown={(e) => {
          const key = e.key.toLowerCase();
          if (key === 'enter') {
            e.preventDefault();
            onCheckedChange(!checked);
          }
        }}
        onKeyPress={(e) => {
          const key = e.key.toLowerCase();
          if (key === ' ' || key === 'space' || key === 'spacebar') {
            e.preventDefault();
            onCheckedChange(!checked);
          }
        }}
        className={cn(
          switchVariants({ size }),
          checked ? 'bg-success-500' : 'bg-gray-200',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={cn(thumbVariants({ size, checked }))}
        />
      </button>
    );
  },
);

Switch.displayName = 'Switch';

export { Switch };
