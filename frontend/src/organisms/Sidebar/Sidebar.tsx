import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Icon } from '@/atoms/Icon';
import { NavItem, type NavItemProps } from '@/molecules/NavItem';

const sidebarVariants = cva(
  'flex flex-col gap-2 p-2 bg-background text-foreground transition-all duration-300',
  {
    variants: {
      collapsed: {
        true: 'w-16',
        false: 'w-64',
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  },
);

export interface SidebarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sidebarVariants> {
  navItems: NavItemProps[];
  onNavigate?: (path: string) => void;
  activePath?: string;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, collapsed, navItems, onNavigate, activePath, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(sidebarVariants({ collapsed }), className)}
        {...props}
      >
        <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
            <NavItem
                key={item.label}
                {...item}
                active={activePath === item.path}
                onClick={() => onNavigate?.(item.path || item.label)}
                label={collapsed ? '' : item.label}
            />
            ))}
        </nav>
      </aside>
    );
  },
);

Sidebar.displayName = 'Sidebar';
export { sidebarVariants };
