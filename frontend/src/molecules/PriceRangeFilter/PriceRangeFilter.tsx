import * as React from 'react';
import { Range } from 'react-range';
import { Input } from '@/atoms/Input';
import { cn } from '@/lib/utils';

export interface PriceRangeFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
  currency?: string;
}

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

export const PriceRangeFilter = React.forwardRef<HTMLDivElement, PriceRangeFilterProps>(
  (
    {
      min,
      max,
      step = 1,
      value,
      onChange,
      currency,
      className,
      ...props
    },
    ref,
  ) => {
    const disabled = min >= max;

    const handleSliderChange = (vals: number[]) => {
      const ordered: [number, number] = [Math.min(vals[0], vals[1]), Math.max(vals[0], vals[1])];
      onChange([
        clamp(ordered[0], min, max),
        clamp(ordered[1], min, max),
      ]);
    };

    const handleInputChange = (index: 0 | 1) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = Number(e.target.value);
      const newVals: [number, number] = [...value] as [number, number];
      newVals[index] = num;
      const ordered: [number, number] = [Math.min(newVals[0], newVals[1]), Math.max(newVals[0], newVals[1])];
      onChange([
        clamp(ordered[0], min, max),
        clamp(ordered[1], min, max),
      ]);
    };

    const trackLeft = ((Math.min(value[0], value[1]) - min) / (max - min)) * 100;
    const trackWidth = ((Math.max(value[0], value[1]) - Math.min(value[0], value[1])) / (max - min)) * 100;

    return (
      <div ref={ref} className={cn('price-range-filter flex items-center gap-2', className)} {...props}>
        <div className="relative w-24">
          {currency && (
            <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {currency}
            </span>
          )}
          <Input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={handleInputChange(0)}
            disabled={disabled}
            aria-label="Precio mínimo"
            className={cn(currency && 'pl-6')}
          />
        </div>
        <div className="flex-1 px-2">
          <Range
            step={step}
            min={min}
            max={max}
            values={value}
            disabled={disabled}
            onChange={handleSliderChange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={props.style}
                className="relative h-2 w-full rounded bg-muted"
              >
                <div
                  className="absolute h-2 rounded bg-primary"
                  style={{ left: `${trackLeft}%`, width: `${trackWidth}%` }}
                />
                {children}
              </div>
            )}
            renderThumb={({ props, index }) => (
              <div
                {...props}
                aria-label={index === 0 ? 'Precio mínimo' : 'Precio máximo'}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value[index]}
                className="h-4 w-4 -mt-1 rounded-full border border-white bg-primary shadow"
              />
            )}
          />
        </div>
        <div className="relative w-24">
          {currency && (
            <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {currency}
            </span>
          )}
          <Input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value[1]}
            onChange={handleInputChange(1)}
            disabled={disabled}
            aria-label="Precio máximo"
            className={cn(currency && 'pl-6')}
          />
        </div>
      </div>
    );
  },
);
PriceRangeFilter.displayName = 'PriceRangeFilter';

export default PriceRangeFilter;
