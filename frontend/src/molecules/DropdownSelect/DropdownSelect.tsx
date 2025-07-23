import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/atoms/Input';
import { Card } from '@/atoms/Card';
import { Icon } from '@/atoms/Icon';
import { Checkbox } from '@/atoms/Checkbox/Checkbox';
import { Text } from '@/atoms/Text';

export interface DropdownSelectProps {
  /** Options to show in the list */
  options: string[];
  /** Currently selected option(s) */
  selected?: string | string[];
  /** Placeholder when no value selected */
  placeholder?: string;
  /** Allow selecting multiple values */
  multiple?: boolean;
  /** Show search field */
  searchable?: boolean;
  /** Callback when selection changes */
  onChange?: (value: string | string[]) => void;
  /** Callback when dropdown opens */
  onOpen?: () => void;
  /** Callback when dropdown closes */
  onClose?: () => void;
  /** Callback when typing in search field */
  onSearch?: (term: string) => void;
  className?: string;
}

export const DropdownSelect = React.forwardRef<HTMLDivElement, DropdownSelectProps>(
  (
    {
      options,
      selected,
      placeholder = 'Seleccione',
      multiple = false,
      searchable = false,
      onChange,
      onOpen,
      onClose,
      onSearch,
      className,
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const isControlled = selected !== undefined;
    const [internalSelected, setInternalSelected] = React.useState<
      string | string[] | undefined
    >(selected);

    React.useEffect(() => {
      if (isControlled) setInternalSelected(selected);
    }, [isControlled, selected]);

    const toggleOpen = () => {
      setOpen((prev) => {
        if (prev) onClose?.();
        else onOpen?.();
        return !prev;
      });
    };

    const close = () => {
      setOpen(false);
      onClose?.();
    };

    React.useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          close();
        }
      };
      if (open) {
        document.addEventListener('mousedown', handler);
      }
      return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      onSearch?.(e.target.value);
    };

    const current = isControlled ? selected : internalSelected;

    const isSelected = (opt: string) =>
      multiple
        ? Array.isArray(current) && current.includes(opt)
        : current === opt;

    const handleSelect = (opt: string) => {
      if (multiple) {
        const arr = Array.isArray(current) ? [...current] : [];
        const exists = arr.includes(opt);
        const newVal = exists ? arr.filter((o) => o !== opt) : [...arr, opt];
        if (!isControlled) setInternalSelected(newVal);
        onChange?.(newVal);
      } else {
        if (!isControlled) setInternalSelected(opt);
        onChange?.(opt);
        close();
      }
    };

    const display = multiple
      ? Array.isArray(current)
        ? current.join(', ')
        : ''
      : (current as string) ?? '';

    const filtered = options.filter((o) => o.toLowerCase().includes(search.toLowerCase()));

    const ArrowIcon = ({ className }: { className?: string; size?: number }) => (
      <Icon
        name="ChevronDown"
        className={cn('transition-transform', open && 'rotate-180', className)}
      />
    );

    const SearchIcon = ({ className, size }: { className?: string; size?: number }) => (
      <Icon name="Search" className={className} size={size} />
    );

    return (
      <div ref={containerRef} className={cn('relative', className)}>
        <Input
          readOnly
          value={display}
          placeholder={placeholder}
          onClick={toggleOpen}
          RightIcon={ArrowIcon}
          className="cursor-pointer"
        />
        {open && (
          <Card className="absolute z-10 mt-1 w-full max-h-60 overflow-auto">
            {searchable && (
              <Input
                size="sm"
                LeftIcon={SearchIcon}
                placeholder="Buscar..."
                value={search}
                onChange={handleSearch}
                className="mb-2"
              />
            )}
            <ul>
              {filtered.map((opt) => (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className="flex w-full items-center px-3 py-2 text-left hover:bg-muted"
                  >
                    {multiple && (
                      <Checkbox className="mr-2" checked={isSelected(opt)} readOnly />
                    )}
                    <Text as="span" className="flex-1 truncate">
                      {opt}
                    </Text>
                    {isSelected(opt) && !multiple && (
                      <Icon name="Check" size="sm" className="ml-2" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    );
  },
);
DropdownSelect.displayName = 'DropdownSelect';

