import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { SearchBar } from '@/molecules/SearchBar';
import { NotificationIcon } from '@/molecules/NotificationIcon';
import { DropdownMenu, type DropdownMenuItem } from '@/molecules/DropdownMenu';
import { Avatar } from '@/atoms/Avatar';
import { Button } from '@/atoms/Button';
import { Icon } from '@/atoms/Icon';
import { ThemeSwitcher } from '@/atoms/ThemeSwitcher';
import { Modal } from '@/atoms/Modal';

const topBarVariants = cva(
  'flex items-center gap-4 px-4 shadow-sm border-b border-border h-14 sm:h-16',
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

export interface TopBarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof topBarVariants> {
  onSearch?: (term: string) => void;
  notificationsCount?: number;
  onNotificationsOpen?: () => void;
  userName?: string;
  userAvatarSrc?: string;
  userMenuItems?: DropdownMenuItem[];
}

export interface TopBarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof topBarVariants> {
  onSearch?: (term: string) => void;
  notificationsCount?: number;
  onNotificationsOpen?: () => void;
  userName?: string;
  userAvatarSrc?: string;
  userMenuItems?: DropdownMenuItem[];
  onToggleSidebar?: () => void;
  storeMenuItems?: DropdownMenuItem[];
  activeStore?: string;
  onStoreChange?: (store: DropdownMenuItem) => void;
}

export const TopBar = React.forwardRef<HTMLElement, TopBarProps>(
  (
    {
      className,
      variant,
      color,
      onSearch,
      notificationsCount,
      onNotificationsOpen,
      userName,
      userAvatarSrc,
      userMenuItems,
      onToggleSidebar,
      storeMenuItems,
      activeStore,
      onStoreChange,
      ...props
    },
    ref,
  ) => {
    const [searchOpen, setSearchOpen] = React.useState(false);

    const userTrigger = (
      <div className="flex items-center gap-2">
        <Avatar src={userAvatarSrc} name={userName} size="sm" />
        <span className="text-sm font-medium hidden sm:inline">{userName}</span>
      </div>
    );

    return (
      <header
        ref={ref}
        className={cn(topBarVariants({ variant, color }), className)}
        {...props}
      >
        <div className="flex items-center gap-2">
          <Button
            variant="icon"
            size="sm"
            onClick={onToggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <Icon name="Menu" aria-hidden="true" />
          </Button>
          <div className="flex-1">
            <SearchBar onSearch={onSearch ?? (() => {})} className="max-w-xs" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {storeMenuItems && (
            <DropdownMenu
                items={storeMenuItems}
                triggerLabel={activeStore ?? 'Select Store'}
                onSelect={onStoreChange}
            />
          )}
          <Button
            variant="icon"
            size="sm"
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar"
            className="sm:hidden"
          >
            <Icon name="Search" aria-hidden="true" />
          </Button>
          <NotificationIcon
            count={notificationsCount}
            onClick={onNotificationsOpen}
            aria-label="Notifications"
          />
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
        <Modal isOpen={searchOpen} onClose={() => setSearchOpen(false)} title="Buscar">
          <SearchBar onSearch={onSearch ?? (() => {})} className="w-full" />
        </Modal>
      </header>
    );
  },
);

TopBar.displayName = 'TopBar';
export { topBarVariants };
