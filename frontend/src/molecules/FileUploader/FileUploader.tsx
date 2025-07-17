import * as React from 'react';
import { Card } from '@/atoms/Card';
import { Icon } from '@/atoms/Icon';
import { Button } from '@/atoms/Button/Button';
import { cn } from '@/lib/utils';

export interface FileUploaderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'> {
  /** Preview url or initial file */
  value?: string;
  /** Instruction label */
  label?: string;
  /** Allow selecting multiple files */
  multiple?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Called when a file is selected */
  onFileSelect?: (files: FileList) => void;
  /** Called when file is removed */
  onFileRemove?: () => void;
  /** Called when dropping files */
  onDrop?: (files: FileList) => void;
  /** Called when dropping invalid file */
  onError?: (message: string) => void;
}

export const FileUploader = React.forwardRef<HTMLInputElement, FileUploaderProps>(
  (
    {
      value,
      label = 'Arrastra una imagen aquí o haz clic para seleccionar',
      multiple = false,
      disabled = false,
      accept,
      onFileSelect,
      onFileRemove,
      onDrop: onDropProp,
      onError,
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    const [preview, setPreview] = React.useState<string | null>(value ?? null);
    const [isDragging, setDragging] = React.useState(false);

    React.useEffect(() => {
      setPreview(value ?? null);
    }, [value]);

    const handleFiles = (files: FileList) => {
      if (!files || files.length === 0) return;
      const file = files[0];
      if (accept && file.type && !file.type.match(accept.replace('*', '.*'))) {
        onError?.('Tipo de archivo no permitido');
        return;
      }
      const url = URL.createObjectURL(file);
      setPreview(url);
      onFileSelect?.(files);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (e.target.files) {
        handleFiles(e.target.files);
      }
    };

    const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
      e.preventDefault();
      if (disabled) return;
      setDragging(false);
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        onDropProp?.(files);
        handleFiles(files);
      }
    };

    const openFileDialog = () => {
      if (!disabled) {
        inputRef.current?.click();
      }
    };

    const handleRemove = (ev: React.MouseEvent) => {
      ev.stopPropagation();
      setPreview(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      onFileRemove?.();
    };

    return (
      <Card
        variant="outline"
        className={cn(
          'relative flex h-40 w-full cursor-pointer items-center justify-center border-2 border-dashed',
          isDragging && 'border-primary',
          disabled && 'pointer-events-none opacity-50',
        )}
        role="button"
        aria-disabled={disabled}
        onClick={openFileDialog}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        {!preview ? (
          <div className="flex flex-col items-center text-center pointer-events-none space-y-1">
            <Icon name="Upload" size="lg" />
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        ) : (
          <>
            <img src={preview} alt="preview" className="absolute inset-0 h-full w-full rounded-md object-cover" />
            <Button
              type="button"
              variant="icon"
              intent="secondary"
              size="sm"
              aria-label="Eliminar archivo"
              className="absolute right-1 top-1 z-10"
              onClick={handleRemove}
            >
              <Icon name="X" size="sm" />
            </Button>
          </>
        )}
      </Card>
    );
  },
);
FileUploader.displayName = 'FileUploader';

