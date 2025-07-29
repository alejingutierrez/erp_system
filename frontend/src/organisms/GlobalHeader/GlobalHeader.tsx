import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { AppLayout } from '@/templates/AppLayout';
import { Sidebar } from '@/organisms/Sidebar';
import { TopBar } from '@/organisms/TopBar';
import type { NavItemProps } from '@/molecules/NavItem';
import type { DropdownMenuItem } from '@/molecules/DropdownMenu';
import { Level2Panel } from '../Level2Panel';

const globalHeaderVariants = cva('global-header', {
  variants: {},
  defaultVariants: {},
});

export interface GlobalHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof globalHeaderVariants> {
  navItems?: NavItemProps[];
  actionLabel?: string;
  onAction?: () => void;
  notificationsCount?: number;
  userName?: string;
  userAvatarSrc?: string;
  userMenuItems?: DropdownMenuItem[];
  activePath?: string;
  onNavigate?: (path: string) => void;
  onSearch?: (term: string) => void;
  onNotificationsOpen?: () => void;
  level2Title?: string;
  level2Actions?: {
    label: string;
    onClick: () => void;
  }[];
}

export const GlobalHeader = React.forwardRef<HTMLElement, GlobalHeaderProps>(
  (
    {
      navItems = [],
      actionLabel,
      onAction,
      notificationsCount = 0,
      userName,
      userAvatarSrc,
      userMenuItems,
      onNavigate,
      onSearch,
      onNotificationsOpen,
      activePath,
      level2Title,
      level2Actions,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
    const [activeLevel1, setActiveLevel1] = React.useState<string | null>(null);

    const handleNavigate = (path: string) => {
        setActiveLevel1(path);
        onNavigate?.(path);
    }

    return (
      <AppLayout
        {...props}
        ref={ref}
        className={cn(globalHeaderVariants(), className)}
        sidebar={
          <Sidebar
            navItems={navItems}
            collapsed={sidebarCollapsed}
            onNavigate={handleNavigate}
            activePath={activePath}
          />
        }
        topbar={
          <TopBar
            notificationsCount={notificationsCount}
            userName={userName}
            userAvatarSrc={userAvatarSrc}
            userMenuItems={userMenuItems}
            onSearch={onSearch}
            onNotificationsOpen={onNotificationsOpen}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        }
      >
        {level2Title ? (
            <Level2Panel title={level2Title} actions={level2Actions}>
                {children}
            </Level2Panel>
        ) : children}
      </AppLayout>
    );
  },
);

GlobalHeader.displayName = 'GlobalHeader';
export { globalHeaderVariants };
