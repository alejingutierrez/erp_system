import * as React from 'react';
import { VariantProps } from 'class-variance-authority';

import { Button, buttonVariants, ButtonProps } from '@/atoms/Button/Button';
import { cn } from '@/lib/utils';

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>,
    Pick<ButtonProps, 'intent' | 'variant' | 'size'> {
  /** Text shown on the trigger button */
  buttonText?: string;
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      buttonText = 'Seleccionar archivo',
      className,
      intent = 'secondary',
      variant = 'outline',
      size = 'md',
      multiple,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [fileLabel, setFileLabel] = React.useState('');
    const inputId = React.useId();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const files = Array.from(e.target.files ?? []);
      setFileLabel(
        files.length === 0
          ? ''
          : multiple && files.length > 1
          ? `${files.length} archivos seleccionados`
          : files[0].name,
      );
      onChange?.(e);
    };

    return (
      <div className="flex items-center gap-2">
        <input
          id={inputId}
          type="file"
          multiple={multiple}
          ref={ref}
          onChange={handleChange}
          className="hidden"
          {...props}
        />
        <label htmlFor={inputId} className="shrink-0">
          <Button type="button" intent={intent} variant={variant} size={size}>
            {buttonText}
          </Button>
        </label>
        <span className={cn('text-sm text-muted-foreground', className)}>
          {fileLabel || 'Ningún archivo seleccionado'}
        </span>
      </div>
    );
  },
);
FileUpload.displayName = 'FileUpload';

export { FileUpload };
