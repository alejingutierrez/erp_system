import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Checkbox component
 * - fully controlled or uncontrolled via native `checked` / `defaultChecked` props
 * - supports `indeterminate` visual state through ref manipulation
 * - two shapes: square (default) and round
 * - three sizes: sm, md (default), lg – matching the rest of the design system
 */

const checkboxVariants = cva(
  [
    // Base styles – invisible native checkbox replaced by custom square using pseudo‐element
    'peer appearance-none relative border border-border bg-background outline-none cursor-pointer',
    // Motion & focus ring
    'transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary disabled:cursor-not-allowed disabled:opacity-50',
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
      shape: {
        square: 'rounded',
        round: 'rounded-full',
      },
      size: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      intent: 'primary',
      shape: 'square',
      size: 'md',
    },
  },
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>,
    VariantProps<typeof checkboxVariants> {
  /**
   * Renders the checkbox in indeterminate (mixed) state.
   * You are responsible for handling the tri‐state logic.
   */
  indeterminate?: boolean;
  /**
   * Optional label text shown to the right of the control. If omitted, children can be used
   * to render custom label content.
   */
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, shape, size, intent = 'primary', indeterminate = false, label, children, id, ...props },
    ref,
  ) => {
    const internalRef = React.useRef<HTMLInputElement>(null);

    // Expose the ref to parent components
    React.useImperativeHandle(ref, () => internalRef.current as HTMLInputElement);

    // Keep indeterminate attribute in sync
    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const inputId = id ?? React.useId();

    // Check-mark SVG rendered above the native input.
    // Visibility toggled via peer-checked and peer-indeterminate utilities.
    const iconSize = size === 'lg' ? 16 : size === 'sm' ? 10 : 12;

    return (
      <label htmlFor={inputId} className="inline-flex items-center gap-4 cursor-pointer select-none">
        <div className="relative">
          <input
            id={inputId}
            type="checkbox"
            ref={internalRef}
            aria-checked={indeterminate ? 'mixed' : props.checked} data-intent={intent}
            className={cn(
              checkboxVariants({ shape, size, intent }),
              // Checked state – filled background
              'checked:bg-primary checked:border-primary',
              intent === 'secondary' && 'checked:bg-secondary checked:border-secondary',
              intent === 'tertiary' && 'checked:bg-tertiary checked:border-tertiary',
              intent === 'quaternary' && 'checked:bg-quaternary checked:border-quaternary',
              intent === 'success' && 'checked:bg-success checked:border-success',
              // Indeterminate state – use same fill as checked
              'peer-[aria-checked="mixed"]:bg-primary peer-[aria-checked="mixed"]:border-primary',
              className,
            )}
            {...props}
          />
          {/* Visual mark – uses opacity to toggle visibility */}
          <svg
            className={cn(
              'pointer-events-none absolute text-primary-foreground',
              'opacity-0 peer-checked:opacity-100 peer-[aria-checked="mixed"]:opacity-100',
            )}
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {indeterminate ? (
              <line x1="5" y1="12" x2="19" y2="12" />
            ) : (
              <polyline points="20 6 9 17 4 12" />
            )}
          </svg>
        </div>
        {label ? <span>{label}</span> : children}
      </label>
    );
  },
);
Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants };
