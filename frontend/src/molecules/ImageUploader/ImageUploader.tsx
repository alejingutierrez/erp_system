import * as React from 'react';
import { FileUpload, type FileUploadProps } from '@/atoms/FileUpload';
import { Icon } from '@/atoms/Icon';
import { cn } from '@/lib/utils';

export interface ImageUploaderProps
  extends Omit<FileUploadProps, 'buttonText' | 'multiple' | 'onChange'> {
  /** Allow selecting multiple images */
  multiple?: boolean;
  /** Text for the upload button */
  labelBoton?: string;
  /** Maximum number of images allowed */
  maxImagenes?: number;
  /** Initial image URLs */
  imagenesIniciales?: string[];
  /** Fired when files are selected */
  onUpload?: (files: File[]) => void;
  /** Fired when removing image */
  onRemoveImage?: (index: number) => void;
  /** Fired when maximum exceeded */
  onMaxExceeded?: (max: number) => void;
}

interface PreviewImage {
  src: string;
  file?: File;
}

export const ImageUploader = React.forwardRef<HTMLInputElement, ImageUploaderProps>(
  (
    {
      multiple = false,
      labelBoton = 'Seleccionar imágenes',
      maxImagenes,
      imagenesIniciales = [],
      onUpload,
      onRemoveImage,
      onMaxExceeded,
      className,
      ...props
    },
    ref,
  ) => {
    const [images, setImages] = React.useState<PreviewImage[]>(() =>
      imagenesIniciales.map((src) => ({ src })),
    );

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const files = Array.from(e.target.files ?? []);
      if (maxImagenes && images.length >= maxImagenes) {
        onMaxExceeded?.(maxImagenes);
        return;
      }
      let allowedFiles = files;
      if (maxImagenes && images.length + files.length > maxImagenes) {
        allowedFiles = files.slice(0, maxImagenes - images.length);
        onMaxExceeded?.(maxImagenes);
      }
      const newImages = allowedFiles.map((file) => ({
        src: URL.createObjectURL(file),
        file,
      }));
      setImages((prev) => (multiple ? [...prev, ...newImages] : newImages));
      onUpload?.(allowedFiles);
    };

    const removeImage = (index: number) => {
      setImages((prev) => {
        const removed = prev[index];
        if (removed?.file) URL.revokeObjectURL(removed.src);
        const next = prev.filter((_, i) => i !== index);
        return next;
      });
      onRemoveImage?.(index);
    };

    return (
      <div className={cn('space-y-2', className)}>
        <FileUpload
          ref={ref}
          multiple={multiple}
          buttonText={labelBoton}
          onChange={handleChange}
          {...props}
        />
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative h-20 w-20 overflow-hidden rounded-md border border-border shadow-sm"
              >
                <img
                  src={img.src}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  aria-label="Eliminar"
                  onClick={() => removeImage(idx)}
                  className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white hover:bg-black/80"
                >
                  <Icon name="X" size="sm" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);
ImageUploader.displayName = 'ImageUploader';

export { ImageUploader };
