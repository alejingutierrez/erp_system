import * as React from 'react';
import { Button } from '@/atoms/Button';
import { Icon } from '@/atoms/Icon';

export interface ThemeSwitcherProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ThemeSwitcher = React.forwardRef<HTMLButtonElement, ThemeSwitcherProps>(
  ({ className, ...props }, ref) => {
    const [dark, setDark] = React.useState(() =>
      typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
    );

    React.useEffect(() => {
      if (dark) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }, [dark]);

    const toggle = () => setDark((d) => !d);

    return (
      <Button
        variant="icon"
        size="sm"
        onClick={toggle}
        aria-label="Toggle theme"
        ref={ref}
        className={className}
        {...props}
      >
        <Icon name={dark ? 'Sun' : 'Moon'} aria-hidden="true" />
      </Button>
    );
  },
);
ThemeSwitcher.displayName = 'ThemeSwitcher';
