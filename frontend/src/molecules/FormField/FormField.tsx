import * as React from 'react';
import { cn } from '@/lib/utils';

export interface FormControlProps {
  id?: string;
  required?: boolean;
  'aria-required'?: boolean;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
  onFocus?: React.FocusEventHandler<any>;
  onBlur?: React.FocusEventHandler<any>;
}

export interface FormFieldProps
  extends React.HTMLAttributes<HTMLFieldSetElement> {
  id: string;
  label: React.ReactNode;
  required?: boolean;
  helperText?: string;
  error?: string;
  children: React.ReactElement<FormControlProps>;
}

export const FormField = React.forwardRef<HTMLFieldSetElement, FormFieldProps>(
  (
    {
      id,
      label,
      required = false,
      helperText,
      error,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = React.useState(false);
    const messageId = helperText || error ? `${id}-message` : undefined;

    const handleFocus: React.FocusEventHandler<any> = (e) => {
      setFocused(true);
      children.props.onFocus?.(e);
    };

    const handleBlur: React.FocusEventHandler<any> = (e) => {
      setFocused(false);
      children.props.onBlur?.(e);
    };

    const control = React.cloneElement(children, {
      id,
      required,
      'aria-required': required || undefined,
      'aria-invalid': error ? true : children.props['aria-invalid'],
      'aria-describedby': messageId,
      onFocus: handleFocus,
      onBlur: handleBlur,
    });

    return (
      <fieldset
        ref={ref}
        data-focused={focused || undefined}
        className={cn('form-field space-y-1', className)}
        {...props}
      >
        <label htmlFor={id} className="form-field__label block text-sm font-medium">
          {label}
          {required && (
            <span aria-hidden="true" className="text-destructive ml-1">
              *
            </span>
          )}
        </label>
        <div className="form-field__control">{control}</div>
        {(helperText || error) && (
          <p
            id={messageId}
            role={error ? 'alert' : undefined}
            className={cn(
              'form-field__message text-sm',
              error ? 'text-destructive' : 'text-muted-foreground',
            )}
          >
            {error ?? helperText}
          </p>
        )}
      </fieldset>
    );
  },
);
FormField.displayName = 'FormField';

export type { FormControlProps };
