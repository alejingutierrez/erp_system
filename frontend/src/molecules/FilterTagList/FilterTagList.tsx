import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Tag, tagVariants } from '@/atoms/Tag';
import { Button } from '@/atoms/Button';
import { Icon, type IconName } from '@/atoms/Icon';

export interface FilterTagListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of filter labels */
  filters: string[];
  /** Show a button to clear all filters */
  showClearAll?: boolean;
  /** Variant style for the tags */
  tagVariant?: VariantProps<typeof tagVariants>['variant'];
  /** Color style for the tags */
  tagColor?: VariantProps<typeof tagVariants>['color'];
  /** Optional icon to display before each filter label */
  icon?: IconName;
  /** Fired when a single filter is removed */
  onRemove?: (filter: string) => void;
  /** Fired when all filters are cleared */
  onClearAll?: () => void;
}

export const FilterTagList = React.forwardRef<HTMLDivElement, FilterTagListProps>(
  (
    {
      filters,
      showClearAll = false,
      tagVariant = 'outline',
      tagColor = 'primary',
      icon,
      onRemove,
      onClearAll,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-wrap items-center gap-2', className)}
        {...props}
      >
        {filters.map((filter) => (
          <Tag
            key={filter}
            variant={tagVariant}
            color={tagColor}
            closable
            onRemove={() => onRemove?.(filter)}
          >
            {icon && (
              <Icon name={icon} size="sm" className="mr-1" aria-hidden="true" />
            )}
            {filter}
          </Tag>
        ))}
        {showClearAll && filters.length > 0 && (
          <Button
            variant="ghost"
            intent="primary"
            size="sm"
            onClick={onClearAll}
            className="whitespace-nowrap"
          >
            Quitar filtros
          </Button>
        )}
      </div>
    );
  },
);
FilterTagList.displayName = 'FilterTagList';

export default FilterTagList;
