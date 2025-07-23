import * as React from 'react';
import { Button } from '@/atoms/Button/Button';
import { Icon } from '@/atoms/Icon';
import { cn } from '@/lib/utils';

export interface PaginationControlsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current active page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Number of sibling pages to show around the current page */
  siblings?: number;
  /** Show buttons for first and last page */
  showFirstLast?: boolean;
  /** Disable all controls */
  disabled?: boolean;
  /** Callback fired when page changes */
  onPageChange?: (page: number) => void;
}

type PageItem = number | 'dots';

const MAX_VISIBLE_PAGES = 5;

function getPageRange(total: number, current: number, siblings: number): PageItem[] {
  const range: PageItem[] = [];

  if (total <= MAX_VISIBLE_PAGES) {
    for (let i = 1; i <= total; i++) range.push(i);
    return range;
  }

  const totalNumbers = siblings * 2 + 3; // current, siblings on both sides, first and last
  const totalBlocks = totalNumbers + 2; // with two dots

  const leftSiblingIndex = Math.max(current - siblings, 2);
  const rightSiblingIndex = Math.min(current + siblings, total - 1);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < total - 1;

  range.push(1);
  if (showLeftDots) range.push('dots');

  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    range.push(i);
  }

  if (showRightDots) range.push('dots');
  range.push(total);
  return range;
}

export const PaginationControls = React.forwardRef<HTMLDivElement, PaginationControlsProps>(
  (
    {
      currentPage,
      totalPages,
      siblings = 1,
      showFirstLast = false,
      disabled = false,
      onPageChange,
      className,
      ...props
    },
    ref,
  ) => {
    const handleChange = (page: number) => {
      if (page === currentPage || page < 1 || page > totalPages) return;
      onPageChange?.(page);
    };

    const pages = React.useMemo(
      () => getPageRange(totalPages, currentPage, siblings),
      [totalPages, currentPage, siblings],
    );

    const buttonVariant = 'ghost';
    const baseButtonClass = 'w-8 h-8 p-0 !min-w-0 rounded-md';

    return (
      <div ref={ref} className={cn('flex items-center justify-center gap-2', className)} {...props}>
        {showFirstLast && (
          <Button
            variant={buttonVariant}
            size="sm"
            className={baseButtonClass + ' border'}
            disabled={disabled || currentPage === 1}
            onClick={() => handleChange(1)}
            aria-label="First page"
          >
            <Icon name="ChevronLeft" className="-mr-1 rotate-180" />
            <Icon name="ChevronLeft" />
          </Button>
        )}
        <Button
          variant={buttonVariant}
          size="sm"
          className={baseButtonClass + ' border'}
          disabled={disabled || currentPage === 1}
          onClick={() => handleChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <Icon name="ChevronLeft" />
        </Button>
        {pages.map((page, idx) =>
          page === 'dots' ? (
            <span key={`dots-${idx}`} className="px-2 text-sm">
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : buttonVariant}
              intent="primary"
              size="sm"
              className={cn(baseButtonClass, page === currentPage ? '' : 'border border-border')}
              disabled={disabled}
              onClick={() => handleChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </Button>
          ),
        )}
        <Button
          variant={buttonVariant}
          size="sm"
          className={baseButtonClass + ' border'}
          disabled={disabled || currentPage === totalPages}
          onClick={() => handleChange(currentPage + 1)}
          aria-label="Next page"
        >
          <Icon name="ChevronRight" />
        </Button>
        {showFirstLast && (
          <Button
            variant={buttonVariant}
            size="sm"
            className={baseButtonClass + ' border'}
            disabled={disabled || currentPage === totalPages}
            onClick={() => handleChange(totalPages)}
            aria-label="Last page"
          >
            <Icon name="ChevronRight" />
            <Icon name="ChevronRight" className="-ml-1" />
          </Button>
        )}
      </div>
    );
  },
);
PaginationControls.displayName = 'PaginationControls';


