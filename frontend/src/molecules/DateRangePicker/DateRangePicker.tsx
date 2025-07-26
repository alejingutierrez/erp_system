import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/atoms/Input';
import { Modal } from '@/atoms/Modal/Modal';
import { Icon } from '@/atoms/Icon';
import { Button } from '@/atoms/Button/Button';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  /** Disable selecting past dates */
  disabledPast?: boolean;
}

const dayMs = 24 * 60 * 60 * 1000;
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const isBefore = (a: Date, b: Date) => a.getTime() < b.getTime();
const addDays = (d: Date, days: number) => new Date(d.getTime() + days * dayMs);
const addMonths = (d: Date, months: number) => new Date(d.getFullYear(), d.getMonth() + months, d.getDate());
const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const endOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
const formatDate = (d: Date | null) => (d ? d.toISOString().split('T')[0] : '');

function getCalendarMatrix(month: Date) {
  const start = startOfMonth(month);
  const end = endOfMonth(month);
  const startDay = start.getDay();
  const days = end.getDate();
  const matrix: Date[][] = [];
  let current = addDays(start, -startDay);
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(current);
      current = addDays(current, 1);
    }
    matrix.push(week);
  }
  return matrix;
}

export const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  ({ value, onChange, disabledPast = false, className, ...props }, ref) => {
    const isControlled = value !== undefined;
    const today = startOfDay(new Date());
    const [range, setRange] = React.useState<DateRange>(value ?? { start: null, end: null });
    const [selecting, setSelecting] = React.useState<'start' | 'end'>('start');
    const [open, setOpen] = React.useState(false);
    const [month, setMonth] = React.useState(startOfMonth(today));
    const [focusDate, setFocusDate] = React.useState(startOfMonth(today));
    const gridRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (isControlled) setRange(value as DateRange);
    }, [isControlled, value]);

    React.useEffect(() => {
      if (open) {
        setTimeout(() => {
          gridRef.current?.querySelector<HTMLButtonElement>('button[data-focus="true"]')?.focus();
        }, 0);
      }
    }, [open, focusDate]);

    const updateRange = (next: DateRange) => {
      if (!isControlled) setRange(next);
      onChange?.(next);
    };

    const handleSelect = (date: Date) => {
      if (selecting === 'start') {
        updateRange({ start: date, end: null });
        setSelecting('end');
      } else if (range.start) {
        let start = range.start;
        let end = date;
        if (isBefore(end, start)) {
          [start, end] = [end, start];
        }
        updateRange({ start, end });
        setSelecting('start');
        setOpen(false);
      }
    };

    const monthLabel = month.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

    const weeks = getCalendarMatrix(month);

    const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const key = e.key;
      if (key === 'Escape') {
        setOpen(false);
        return;
      }
      if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(key)) {
        e.preventDefault();
        const delta = key === 'ArrowRight' ? 1 : key === 'ArrowLeft' ? -1 : key === 'ArrowUp' ? -7 : 7;
        const next = addDays(focusDate, delta);
        setMonth(startOfMonth(next));
        setFocusDate(next);
      }
    };

    const CalendarIcon = ({ className }: { className?: string }) => (
      <Icon name="Calendar" className={className} />
    );

    const renderCalendar = () => (
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="space-y-2" onKeyDown={handleKey} ref={gridRef}>
          <div className="flex items-center justify-between">
            <Button variant="icon" size="sm" onClick={() => setMonth(addMonths(month, -1))} aria-label="Prev month">
              <Icon name="ChevronLeft" />
            </Button>
            <span className="text-sm font-semibold capitalize">{monthLabel}</span>
            <Button variant="icon" size="sm" onClick={() => setMonth(addMonths(month, 1))} aria-label="Next month">
              <Icon name="ChevronRight" />
            </Button>
          </div>
          <div role="table" className="space-y-1">
            {weeks.map((week, wi) => (
              <div role="row" key={wi} className="grid grid-cols-7 gap-1">
                {week.map((day, di) => {
                  const disabledStart = disabledPast && selecting === 'start' && isBefore(day, today);
                  const disabledEnd = selecting === 'end' && range.start && isBefore(day, range.start);
                  const disabled = disabledStart || disabledEnd;
                  const selected =
                    (range.start && isSameDay(day, range.start)) ||
                    (range.end && isSameDay(day, range.end));
                  return (
                    <button
                      key={di}
                      type="button"
                      role="cell"
                      disabled={disabled}
                      data-focus={isSameDay(day, focusDate) || undefined}
                      onClick={() => handleSelect(day)}
                      className={cn(
                        'w-8 h-8 rounded text-sm flex items-center justify-center',
                        day.getMonth() !== month.getMonth() && 'text-muted-foreground',
                        selected && 'bg-primary text-primary-foreground',
                        disabled && 'opacity-50 cursor-not-allowed',
                      )}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    );

    return (
      <div ref={ref} className={cn('date-range-picker flex items-center gap-2', className)} {...props}>
        <Input
          readOnly
          value={formatDate(range.start)}
          placeholder="Desde"
          onClick={() => {
            setSelecting('start');
            setOpen(true);
            setFocusDate(range.start ?? startOfMonth(month));
          }}
          RightIcon={CalendarIcon}
        />
        <span className="mx-1">-</span>
        <Input
          readOnly
          value={formatDate(range.end)}
          placeholder="Hasta"
          onClick={() => {
            setSelecting('end');
            setOpen(true);
            setFocusDate(range.end ?? (range.start ? range.start : startOfMonth(month)));
          }}
          RightIcon={CalendarIcon}
        />
        {renderCalendar()}
      </div>
    );
  },
);
DateRangePicker.displayName = 'DateRangePicker';

export type { DateRange };
