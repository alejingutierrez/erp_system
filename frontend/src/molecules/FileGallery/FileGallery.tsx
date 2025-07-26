import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/atoms/Button/Button';
import { Icon } from '@/atoms/Icon';
import { ConfirmationDialog } from '@/molecules/ConfirmationDialog';

export interface FileItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'doc';
}

export interface FileGalleryProps
  extends React.HTMLAttributes<HTMLUListElement> {
  /** Files to display */
  items: FileItem[];
  /** Intent color for delete button */
  color?: ButtonProps['intent'];
  /** Called when a file is requested to preview */
  onPreview?: (item: FileItem) => void;
  /** Called after confirming deletion */
  onDelete?: (item: FileItem) => void;
}

export const FileGallery = React.forwardRef<HTMLUListElement, FileGalleryProps>(
  (
    { items, color = 'secondary', onPreview, onDelete, className, ...props },
    ref,
  ) => {
    const [pendingDelete, setPendingDelete] = React.useState<FileItem | null>(
      null,
    );

    const handleConfirm = () => {
      if (pendingDelete) onDelete?.(pendingDelete);
      setPendingDelete(null);
    };

    return (
      <>
        <ul
          ref={ref}
          role="list"
          className={cn('file-gallery grid grid-cols-3 gap-2', className)}
          {...props}
        >
          {items.map((item) => (
            <li
              key={item.id}
              role="listitem"
              className="file-item relative flex flex-col items-center text-center"
            >
              <button
                type="button"
                aria-label={item.name}
                className="group block h-20 w-full overflow-hidden rounded-md border border-border bg-muted"
                onClick={() => onPreview?.(item)}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <Icon name="File" size="lg" />
                  </div>
                )}
              </button>
              <span className="mt-1 block w-full truncate text-xs">{item.name}</span>
              <Button
                variant="icon"
                intent={color}
                size="sm"
                aria-label="Eliminar archivo"
                className="absolute right-1 top-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setPendingDelete(item);
                }}
              >
                <Icon name="Trash2" size="sm" />
              </Button>
            </li>
          ))}
        </ul>
        <ConfirmationDialog
          isOpen={pendingDelete !== null}
          title="Eliminar archivo"
          message="¿Seguro que deseas eliminar este archivo?"
          danger
          onConfirm={handleConfirm}
          onCancel={() => setPendingDelete(null)}
        />
      </>
    );
  },
);
FileGallery.displayName = 'FileGallery';

