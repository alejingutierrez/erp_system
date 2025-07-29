import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { NavItem, type NavItemProps } from '@/molecules/NavItem';
import { SearchBar } from '@/molecules/SearchBar';
import { NotificationIcon } from '@/molecules/NotificationIcon';
import { DropdownMenu, type DropdownMenuItem } from '@/molecules/DropdownMenu';
import { DropdownSelect } from '@/molecules/DropdownSelect';
import { SidebarMenu, type NavLink as SidebarNavLink } from '@/molecules/SidebarMenu';
import { Avatar } from '@/atoms/Avatar';
import { Button } from '@/atoms/Button';
import { Divider } from '@/atoms/Divider';
import { Icon } from '@/atoms/Icon';
import { ThemeSwitcher } from '@/atoms/ThemeSwitcher';
import { Modal } from '@/atoms/Modal';

interface NavChild extends DropdownMenuItem {
  path?: string;
}

interface NavLink extends Omit<NavItemProps, 'active'> {
  path?: string;
  children?: NavChild[];
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
      variant: 'glass',
      color: 'default',
    },
  },
);

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
  sidebarItems?: SidebarNavLink[];
  actionLabel?: string;
  onAction?: () => void;
  notificationsCount?: number;
  userName?: string;
  userAvatarSrc?: string;
  userMenuItems?: DropdownMenuItem[];
  stores?: string[];
  selectedStore?: string;
  onStoreChange?: (store: string) => void;
  helpItems?: DropdownMenuItem[];
  divider?: boolean;
  activePath?: string;
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
      sidebarItems,
      actionLabel,
      onAction,
      notificationsCount = 0,
      userName,
      userAvatarSrc,
      userMenuItems,
      stores = [],
      selectedStore,
      onStoreChange,
      helpItems,
      divider = false,
      onNavigate,
      onSearch,
      onNotificationsOpen,
      activePath,
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
    const [searchOpen, setSearchOpen] = React.useState(false);

    React.useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        const meta = e.metaKey || e.ctrlKey;
        if (meta && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          setSearchOpen(true);
        }
        if (meta && e.shiftKey && e.key.toLowerCase() === 'n') {
          e.preventDefault();
          onAction?.();
        }
      };
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }, [onAction]);

    React.useEffect(() => {
      if (isDesktop) setMobileOpen(false);
    }, [isDesktop]);

    const renderNavItem = (item: NavLink) => {
      const base = (
        <NavItem
          iconName={item.iconName}
          label={item.label}
          active={activePath === item.path}
          onClick={() => {
            if (item.path) onNavigate?.(item.path);
            else onNavigate?.(item.label);
            setMobileOpen(false);
          }}
        />
      );

      if (item.children && item.children.length > 0) {
        return (
          <DropdownMenu
            key={item.label}
            triggerLabel={
              <span className="flex items-center gap-2">
                <Icon name={item.iconName} aria-hidden="true" />
                <span>{item.label}</span>
              </span>
            }
            variant="ghost"
            items={item.children}
            onSelect={(child) => {
              const c = child as NavChild;
              if (c.path) onNavigate?.(c.path);
              else onNavigate?.(c.label);
              setMobileOpen(false);
            }}
          />
        );
      }
      return React.cloneElement(base, { key: item.label });
    };

    const menuItems = sidebarItems ?? navItems;
    const navContent = <>{menuItems.map(renderNavItem)}</>;

    const userTrigger = (
      <div className="flex items-center gap-2">
        <Avatar src={userAvatarSrc} name={userName} size="sm" />
        {isDesktop && userName && (
          <span className="text-sm font-medium">{userName}</span>
        )}
      </div>
    );

    return (
      <div className="flex">
        {isDesktop && menuItems.length > 0 && (
          <SidebarMenu items={menuItems} onNavigate={onNavigate ?? (() => {})} />
        )}
        <div className="flex-1">
          <header
            ref={ref}
            className={cn(headerVariants({ variant, color }), className)}
            {...props}
          >
          <div className="flex items-center gap-2">
            {logo}
            {title && (
              <span className="font-heading text-lg font-medium">{title}</span>
            )}
          </div>
          {!isDesktop && (
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
          {!isLarge && (
            <Button
              variant="icon"
              size="sm"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar"
            >
              <Icon name="Search" aria-hidden="true" />
            </Button>
          )}
          {stores.length > 0 && (
            <DropdownSelect
              options={stores}
              selected={selectedStore}
              onChange={(v) => onStoreChange?.(v as string)}
              className="w-32"
            />
          )}
          <div className="flex items-center gap-2">
            {actionLabel && <Button onClick={onAction}>{actionLabel}</Button>}
            <NotificationIcon
              count={notificationsCount}
              onClick={onNotificationsOpen}
              aria-label="Notifications"
            />
            {helpItems && (
              <DropdownMenu
                items={helpItems}
                triggerLabel={<Icon name="HelpCircle" aria-hidden="true" />}
                variant="ghost"
              />
            )}
            <ThemeSwitcher />
            {userMenuItems && userMenuItems.length > 0 ? (
              <DropdownMenu
                items={userMenuItems}
                triggerLabel={userTrigger}
                variant="ghost"
                align="end"
              />
            ) : (
              userTrigger
            )}
          </div>
        </header>
        {!isDesktop && (
          <nav
            aria-label="Mobile"
            className={cn(
              'overflow-hidden transition-all duration-300 space-y-1 border-b border-t border-border bg-background p-2 sm:hidden',
              mobileOpen ? 'max-h-96' : 'max-h-0',
            )}
          >
            <SearchBar
              onSearch={onSearch ?? (() => {})}
              className="mb-2"
            />
            {navContent}
          </nav>
        )}
        {divider && <Divider className="mt-2" />}
        </div>
        <Modal isOpen={searchOpen} onClose={() => setSearchOpen(false)} title="Buscar">
          <SearchBar onSearch={onSearch ?? (() => {})} className="w-full" />
        </Modal>
      </div>
    );
  },
);

GlobalHeader.displayName = 'GlobalHeader';
export { headerVariants as globalHeaderVariants };
