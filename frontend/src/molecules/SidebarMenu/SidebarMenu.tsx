import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Icon, type IconName } from '@/atoms/Icon';
import { Tooltip } from '@/atoms/Tooltip';
import { Accordion } from '@/atoms/Accordion';

export interface NavLink {
  label: string;
  icon?: IconName;
  path?: string;
  children?: NavLink[];
}

const sidebarVariants = cva(
  'sidebar-menu flex flex-col h-full border-r border-border bg-background glass shadow-glass',
  {
    variants: {
      collapsed: {
        true: 'w-16',
        false: 'w-60',
      },
      color: {
        default: '',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        tertiary: 'bg-tertiary text-tertiary-foreground',
        quaternary: 'bg-quaternary text-quaternary-foreground',
        altPrimary: 'bg-altPrimary text-white',
      },
    },
    defaultVariants: {
      collapsed: false,
      color: 'default',
    },
  },
);

const itemVariants = cva(
  'flex items-center gap-3 w-full rounded-md px-4 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary hover:bg-muted',
  {
    variants: {
      collapsed: {
        true: 'justify-center p-3.5',
        false: '',
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  },
);

interface SidebarMenuContextValue {
  collapsed: boolean;
  open: string[];
  toggle: (label: string) => void;
}

const SidebarMenuContext = React.createContext<SidebarMenuContextValue | null>(null);

export interface SidebarMenuProps extends VariantProps<typeof sidebarVariants> {
  items: NavLink[];
  collapsed?: boolean;
  onNavigate: (path: string) => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  items,
  collapsed = false,
  onNavigate,
  color,
  className,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);
  const [open, setOpen] = React.useState<string[]>([]);

  const toggleCollapse = () => setIsCollapsed((c) => !c);
  const toggle = (label: string) =>
    setOpen((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]));

  React.useEffect(() => {
    if (isCollapsed) setOpen([]);
  }, [isCollapsed]);

  const ctx = React.useMemo(() => ({ collapsed: isCollapsed, open, toggle }), [isCollapsed, open]);

  return (
    <SidebarMenuContext.Provider value={ctx}>
      <aside className={cn(sidebarVariants({ collapsed: isCollapsed, color }), className)}>
        <nav aria-label="Main" className="flex-1 space-y-2 py-3">
          {items.map((item) => (
            <SidebarItem key={item.label} item={item} onNavigate={onNavigate} depth={0} />
          ))}
        </nav>
        <button
          type="button"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? 'Expand menu' : 'Collapse menu'}
          className="m-2 rounded-md p-2 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} aria-hidden="true" />
        </button>
      </aside>
    </SidebarMenuContext.Provider>
  );
};
SidebarMenu.displayName = 'SidebarMenu';

interface SidebarItemProps {
  item: NavLink;
  depth: number;
  onNavigate: (path: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, depth, onNavigate }) => {
  const ctx = React.useContext(SidebarMenuContext);
  if (!ctx) return null;
  const { collapsed, open, toggle } = ctx;
  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = collapsed ? undefined : depth * 20;

  if (hasChildren) {
    const isOpen = open.includes(item.label);
    if (collapsed) {
      return (
        <Tooltip content={item.label} placement="right">
          <button
            type="button"
            onClick={() => toggle(item.label)}
            aria-expanded={isOpen}
            className={cn(itemVariants({ collapsed: true }))}
          >
            {item.icon && <Icon name={item.icon} size="md" aria-hidden="true" />}
          </button>
        </Tooltip>
      );
    }
    return (
      <div style={{ paddingLeft }}>
        <Accordion
          title={
            <span className="flex items-center gap-2">
              {item.icon && <Icon name={item.icon} size="md" aria-hidden="true" />}
              <span>{item.label}</span>
            </span>
          }
          open={isOpen}
          onToggle={() => toggle(item.label)}
        >
          <div className="space-y-2">
            {item.children!.map((child) => (
              <SidebarItem key={child.label} item={child} depth={depth + 1} onNavigate={onNavigate} />
            ))}
          </div>
        </Accordion>
      </div>
    );
  }

  const button = (
    <button
      type="button"
      onClick={() => item.path && onNavigate(item.path)}
      className={cn(itemVariants({ collapsed }))}
      style={{ paddingLeft }}
    >
      {item.icon && <Icon name={item.icon} size="md" aria-hidden="true" />}
      {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
    </button>
  );

  return collapsed ? (
    <Tooltip content={item.label} placement="right">
      {button}
    </Tooltip>
  ) : (
    button
  );
};

export { sidebarVariants };
