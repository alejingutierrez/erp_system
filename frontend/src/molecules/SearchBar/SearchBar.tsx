import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/atoms/Input';
import { Button } from '@/atoms/Button';
import { Icon } from '@/atoms/Icon';

export interface SearchBarProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /** Current search term (controlled or initial value) */
  value?: string;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Show submit button */
  showButton?: boolean;
  /** Called when a search is triggered */
  onSearch(term: string): void;
  /** Debounce time in ms before calling onSearch on typing */
  debounce?: number;
  /** Accessible label for the search form */
  ariaLabel?: string;
}

export const SearchBar = React.forwardRef<HTMLFormElement, SearchBarProps>(
  (
    {
      value,
      placeholder = 'Buscar...',
      showButton = false,
      onSearch,
      debounce = 0,
      ariaLabel = 'Buscar',
      className,
      ...props
    },
    ref,
  ) => {
    const [term, setTerm] = React.useState(value ?? '');
    const timeoutRef = React.useRef<number>();

    React.useEffect(() => {
      if (value !== undefined) setTerm(value);
    }, [value]);

    const emitSearch = React.useCallback(
      (t: string) => {
        onSearch(t);
      },
      [onSearch],
    );

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const val = e.target.value;
      if (value === undefined) setTerm(val);
      else setTerm(val);

      if (debounce > 0) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => emitSearch(val), debounce);
      }
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      window.clearTimeout(timeoutRef.current);
      emitSearch(term);
    };

    const SearchIcon = ({ className, size }: { className?: string; size?: number }) => (
      <Icon name="Search" className={className} size={size} aria-hidden="true" />
    );

    return (
      <form
        role="search"
        aria-label={ariaLabel}
        ref={ref}
        onSubmit={handleSubmit}
        className={cn(
          'search-bar flex items-center gap-2 w-80',
          className,
        )}
        {...props}
      >
        <Input
          type="search"
          placeholder={placeholder}
          value={term}
          onChange={handleChange}
          className="flex-1"
          LeftIcon={showButton ? undefined : SearchIcon}
        />
        {showButton && (
          <Button
            type="submit"
            variant="icon"
            size="md"
            aria-label="Buscar"
            LeftIcon={SearchIcon}
          />
        )}
      </form>
    );
  },
);
SearchBar.displayName = 'SearchBar';

export default SearchBar;
