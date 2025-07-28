import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { NavItem, type NavItemProps } from '@/molecules/NavItem';
import { SearchBar } from '@/molecules/SearchBar';
import { NotificationIcon } from '@/molecules/NotificationIcon';
import { DropdownMenu, type DropdownMenuItem } from '@/molecules/DropdownMenu';
import { Avatar } from '@/atoms/Avatar';
import { Button } from '@/atoms/Button';
import { Divider } from '@/atoms/Divider';
import { Icon } from '@/atoms/Icon';

interface NavLink extends Omit<NavItemProps, 'active'> {
  path?: string;
}

const headerVariants = cva(
  'global-header flex items-center gap-4 px-4 shadow-sm border-b border-border h-14 sm:h-16',
  {
  variants: {
    variant: {
      solid: '',
      glass: 'glass backdrop-blur-md',
    },
    color: {
      default: 'bg-background text-foreground',
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      tertiary: 'bg-tertiary text-tertiary-foreground',
    },
  },
  defaultVariants: {
    variant: 'solid',
    color: 'default',
  },
});

function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = React.useState(() =>
    typeof window === 'undefined' ? true : window.innerWidth >= breakpoint,
  );
  React.useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= breakpoint);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);
  return isDesktop;
}

function useIsLarge(breakpoint = 1280) {
  const [isLarge, setIsLarge] = React.useState(() =>
    typeof window === 'undefined' ? true : window.innerWidth >= breakpoint,
  );
  React.useEffect(() => {
    const onResize = () => setIsLarge(window.innerWidth >= breakpoint);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);
  return isLarge;
}

export interface GlobalHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {
  logo?: React.ReactNode;
  title?: React.ReactNode;
  navItems?: NavLink[];
  actionLabel?: string;
  onAction?: () => void;
  notificationsCount?: number;
  userName?: string;
  userAvatarSrc?: string;
  userMenuItems?: DropdownMenuItem[];
  divider?: boolean;
  onNavigate?: (path: string) => void;
  onSearch?: (term: string) => void;
  onNotificationsOpen?: () => void;
}

export const GlobalHeader = React.forwardRef<HTMLElement, GlobalHeaderProps>(
  (
    {
      logo,
      title,
      navItems = [],
      actionLabel,
      onAction,
      notificationsCount = 0,
      userName,
      userAvatarSrc,
      userMenuItems,
      divider = false,
      onNavigate,
      onSearch,
      onNotificationsOpen,
      variant,
      color,
      className,
      ...props
    },
    ref,
  ) => {
    const isDesktop = useIsDesktop();
    const isLarge = useIsLarge();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    React.useEffect(() => {
      if (isDesktop) setMobileOpen(false);
    }, [isDesktop]);

    const navContent = (
      <>
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            iconName={item.iconName}
            label={item.label}
            onClick={() => {
              if (item.path) onNavigate?.(item.path);
              else onNavigate?.(item.label);
              setMobileOpen(false);
            }}
          />
        ))}
      </>
    );

    const userTrigger = (
      <Avatar src={userAvatarSrc} name={userName} size="sm" />
    );

    return (
      <>
        <header
          ref={ref}
          className={cn(headerVariants({ variant, color }), className)}
          {...props}
        >
          <div className="flex items-center gap-2">
            {logo}
            {title && <span className="font-heading text-lg font-medium">{title}</span>}
          </div>
          {isDesktop ? (
            <nav aria-label="Main" className="flex items-center gap-2">
              {navContent}
            </nav>
          ) : (
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
              className="rounded-md p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <Icon name={mobileOpen ? 'X' : 'Menu'} aria-hidden="true" />
            </button>
          )}
          {isLarge && (
            <SearchBar
              onSearch={onSearch ?? (() => {})}
              className="mx-auto max-w-xs flex-1"
            />
          )}
          <div className="flex items-center gap-2">
            {actionLabel && <Button onClick={onAction}>{actionLabel}</Button>}
            <NotificationIcon
              count={notificationsCount}
              onClick={onNotificationsOpen}
              aria-label="Notifications"
            />
            {userMenuItems && userMenuItems.length > 0 ? (
              <DropdownMenu
                items={userMenuItems}
                triggerLabel={userTrigger}
                align="end"
              />
            ) : (
              userTrigger
            )}
          </div>
        </header>
        {!isDesktop && mobileOpen && (
          <nav
            aria-label="Mobile"
            className="space-y-1 border-b border-t border-border bg-background p-2 sm:hidden"
          >
            <SearchBar onSearch={onSearch ?? (() => {})} className="mb-2" />
            {navContent}
          </nav>
        )}
        {divider && <Divider className="mt-2" />}
      </>
    );
  },
);
GlobalHeader.displayName = 'GlobalHeader';

export { headerVariants as globalHeaderVariants };
