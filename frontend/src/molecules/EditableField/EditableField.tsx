import * as React from 'react';
import { cn } from '@/lib/utils';
import { Text } from '@/atoms/Text';
import { Heading } from '@/atoms/Heading';
import { Input } from '@/atoms/Input';
import { Icon } from '@/atoms/Icon';

export interface EditableFieldProps {
  /** Initial value shown when not editing */
  initialValue?: string;
  /** Placeholder for the input when empty */
  placeholder?: string;
  /** Size of the text and input */
  size?: 'sm' | 'md' | 'lg';
  /** Force editing state externally */
  editable?: boolean;
  /** Use heading instead of text. Provide heading level */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Callback when saving the new value */
  onSave?: (value: string) => void;
  /** Callback when cancelling editing */
  onCancel?: () => void;
  /** Callback when editing starts */
  onEditStart?: () => void;
  className?: string;
}

export const EditableField = React.forwardRef<HTMLDivElement, EditableFieldProps>(
  (
    {
      initialValue = '',
      placeholder = '',
      size = 'md',
      editable,
      headingLevel,
      onSave,
      onCancel,
      onEditStart,
      className,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = React.useState(initialValue);
    const [editValue, setEditValue] = React.useState(initialValue);
    const [internalEditing, setInternalEditing] = React.useState(false);

    const isEditing = editable !== undefined ? editable : internalEditing;

    const startEdit = () => {
      setEditValue(value);
      if (editable === undefined) {
        setInternalEditing(true);
      }
      onEditStart?.();
    };

    const handleSave = () => {
      setValue(editValue);
      if (editable === undefined) {
        setInternalEditing(false);
      }
      onSave?.(editValue);
    };

    const handleCancel = () => {
      setEditValue(value);
      if (editable === undefined) {
        setInternalEditing(false);
      }
      onCancel?.();
    };

    const DisplayComponent = headingLevel ? Heading : Text;

    return (
      <div className={cn('inline-flex items-center gap-2', className)} ref={ref} {...props}>
        {isEditing ? (
          <>
            <Input
              size={size}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder={placeholder}
              className="w-40"
            />
            <button type="button" onClick={handleSave} aria-label="Save" className="text-success hover:text-success/80">
              <Icon name="Check" size="sm" />
            </button>
            <button type="button" onClick={handleCancel} aria-label="Cancel" className="text-destructive hover:text-destructive/80">
              <Icon name="X" size="sm" />
            </button>
          </>
        ) : (
          <>
            <DisplayComponent
              as={headingLevel ? undefined : 'span'}
              level={headingLevel as any}
              size={size as any}
              className="hover:underline decoration-dotted underline-offset-2"
            >
              {value || placeholder}
            </DisplayComponent>
            <button type="button" onClick={startEdit} aria-label="Edit" className="text-muted-foreground hover:text-foreground">
              <Icon name="Edit" size="sm" />
            </button>
          </>
        )}
      </div>
    );
  },
);
EditableField.displayName = 'EditableField';
