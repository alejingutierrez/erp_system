import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Tag, tagVariants } from '@/atoms/Tag';
import { inputVariants } from '@/atoms/Input/Input';

export interface TagInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'>,
    Pick<VariantProps<typeof inputVariants>, 'size' | 'color'> {
  /** Initial tags */
  tags?: string[];
  /** Placeholder when empty */
  placeholder?: string;
  /** Characters that create a new tag */
  separators?: string;
  /** Maximum number of tags allowed */
  maxTags?: number;
  /** Color variant for tags */
  tagColor?: VariantProps<typeof tagVariants>['color'];
  /** Disable input */
  disabled?: boolean;
  /** Callback when tag is added */
  onTagAdd?: (tag: string) => void;
  /** Callback when tag is removed */
  onTagRemove?: (tag: string, index: number) => void;
  /** Callback when tags change */
  onChange?: (tags: string[]) => void;
}

export const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      tags,
      placeholder,
      separators = ',',
      maxTags,
      tagColor = 'secondary',
      size,
      color,
      disabled,
      className,
      onTagAdd,
      onTagRemove,
      onChange,
      onInput,
      ...props
    },
    ref,
  ) => {
    const [tagList, setTagList] = React.useState<string[]>(tags ?? []);
    const [inputValue, setInputValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (tags !== undefined) {
        setTagList(tags);
      }
    }, [tags]);

    const addTag = React.useCallback(
      (value: string) => {
        const trimmed = value.trim();
        if (!trimmed) return;
        if (maxTags && tagList.length >= maxTags) return;
        if (tagList.includes(trimmed)) return;
        const newTags = [...tagList, trimmed];
        setTagList(newTags);
        onTagAdd?.(trimmed);
        onChange?.(newTags);
        setInputValue('');
      },
      [tagList, maxTags, onTagAdd, onChange],
    );

    const removeTag = React.useCallback(
      (index: number) => {
        const removed = tagList[index];
        const newTags = tagList.filter((_, i) => i !== index);
        setTagList(newTags);
        onTagRemove?.(removed, index);
        onChange?.(newTags);
      },
      [tagList, onTagRemove, onChange],
    );

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === 'Enter' || separators.includes(e.key)) {
        e.preventDefault();
        addTag(inputValue);
      } else if (e.key === 'Backspace' && inputValue === '') {
        removeTag(tagList.length - 1);
      }
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      setInputValue(e.target.value);
      onInput?.(e);
    };

    return (
      <div
        className={cn(
          'flex flex-wrap items-center gap-2 cursor-text',
          inputVariants({ size, color }),
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {tagList.map((tag, i) => (
          <Tag
            key={`${tag}-${i}`}
            color={tagColor}
            closable={!disabled}
            onRemove={() => removeTag(i)}
            className="mb-1"
          >
            {tag}
          </Tag>
        ))}
        <input
          ref={inputRef}
          type="text"
          disabled={disabled}
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          placeholder={tagList.length === 0 ? placeholder : undefined}
          className="m-1 flex-1 bg-transparent focus:outline-none"
          {...props}
        />
      </div>
    );
  },
);
TagInput.displayName = 'TagInput';

