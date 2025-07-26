import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Icon } from '@/atoms/Icon';

const starVariants = cva('transition-colors', {
  variants: {
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      tertiary: 'text-tertiary',
      quaternary: 'text-quaternary',
      success: 'text-success',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: { color: 'primary' },
});

export interface RatingStarsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof starVariants> {
  /** Maximum number of stars */
  max?: number;
  /** Current rating value */
  value: number;
  /** Disable interactions */
  readOnly?: boolean;
  /** Callback when rating changes */
  onChange?(val: number): void;
  /** Size of the star in pixels */
  size?: number;
}

export const RatingStars = React.forwardRef<HTMLDivElement, RatingStarsProps>(
  (
    {
      max = 5,
      value,
      readOnly = false,
      onChange,
      size = 20,
      color,
      className,
      ...props
    },
    ref,
  ) => {
    const [hover, setHover] = React.useState<number | null>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (readOnly) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        const next = Math.min(value + 1, max);
        onChange?.(next);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        const prev = Math.max(value - 1, 0);
        onChange?.(prev);
      }
    };

    const stars = Array.from({ length: max }, (_, i) => {
      const filled = hover !== null ? i < hover + 1 : i < value;
      const fillPercent = hover !== null ? (i === Math.floor(hover) ? hover % 1 : i < hover ? 1 : 0) : filled ? 1 : 0;
      return (
        <button
          key={i}
          type="button"
          role="radio"
          aria-label={`${i + 1} de ${max}`}
          aria-checked={i + 1 === value}
          tabIndex={readOnly ? -1 : i + 1 === value ? 0 : -1}
          disabled={readOnly}
          onClick={() => !readOnly && onChange?.(i + 1)}
          onKeyDown={handleKeyDown}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            setHover(i + percent);
          }}
          onMouseLeave={() => setHover(null)}
          className={cn('relative p-0.5', readOnly && 'cursor-default')}
        >
          <Icon
            name="Star"
            className={cn(
              'text-muted-foreground',
              filled && starVariants({ color }),
            )}
            style={{ width: size, height: size }}
          >
            {fillPercent > 0 && (
              <svg
                viewBox="0 0 24 24"
                className="absolute left-0 top-0 overflow-hidden"
                style={{ width: size, height: size, clipPath: `inset(0 ${100 - fillPercent * 100}% 0 0)` }}
              >
                <path
                  d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            )}
          </Icon>
        </button>
      );
    });

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn('rating-stars inline-flex', className)}
        {...props}
      >
        {stars}
      </div>
    );
  },
);
RatingStars.displayName = 'RatingStars';

export { starVariants as ratingStarVariants };
