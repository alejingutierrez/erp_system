import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TabsColor = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'success';
export type TabsVariant = 'underline' | 'solid' | 'accordion';
export type TabsOrientation = 'horizontal' | 'vertical';

export interface TabItem {
  label: React.ReactNode;
  content: React.ReactNode;
  id?: string;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  defaultIndex?: number;
  variant?: TabsVariant;
  color?: TabsColor;
  orientation?: TabsOrientation;
}

const colorClasses: Record<TabsColor, { underline: string; solid: string; accordion: string }> = {
  primary: {
    underline: 'data-[active=true]:border-primary data-[active=true]:text-primary',
    solid: 'data-[active=true]:bg-primary data-[active=true]:text-primary-foreground',
    accordion: 'data-[active=true]:text-primary',
  },
  secondary: {
    underline: 'data-[active=true]:border-secondary data-[active=true]:text-secondary',
    solid: 'data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground',
    accordion: 'data-[active=true]:text-secondary',
  },
  tertiary: {
    underline: 'data-[active=true]:border-tertiary data-[active=true]:text-tertiary',
    solid: 'data-[active=true]:bg-tertiary data-[active=true]:text-tertiary-foreground',
    accordion: 'data-[active=true]:text-tertiary',
  },
  quaternary: {
    underline: 'data-[active=true]:border-quaternary data-[active=true]:text-quaternary',
    solid: 'data-[active=true]:bg-quaternary data-[active=true]:text-quaternary-foreground',
    accordion: 'data-[active=true]:text-quaternary',
  },
  success: {
    underline: 'data-[active=true]:border-success data-[active=true]:text-success',
    solid: 'data-[active=true]:bg-success data-[active=true]:text-success-foreground',
    accordion: 'data-[active=true]:text-success',
  },
};

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      defaultIndex = 0,
      variant = 'underline',
      color = 'primary',
      orientation = 'horizontal',
      className,
      ...props
    },
    ref,
  ) => {
    const [active, setActive] = React.useState(defaultIndex);
    const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const key = e.key;
      if (!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp'].includes(key)) return;
      e.preventDefault();
      const dir = key === 'ArrowRight' || key === 'ArrowDown' ? 1 : -1;
      const next = (active + dir + items.length) % items.length;
      tabRefs.current[next]?.focus();
      setActive(next);
    };

    const orientationClasses = orientation === 'vertical' ? 'flex flex-row' : 'flex flex-col';
    const listClasses = orientation === 'vertical' ? 'flex flex-col border-r' : 'flex border-b';
    const panelClasses = orientation === 'vertical' ? 'flex-1 p-4' : 'p-4';

    if (variant === 'accordion') {
      return (
        <div ref={ref} className={cn('flex flex-col', className)} {...props}>
          {items.map((item, index) => {
            const id = item.id ?? `tab-${index}`;
            const panelId = `${id}-panel`;
            const isActive = active === index;
            return (
              <div key={id} className="border-b">
                <button
                  id={id}
                  ref={(el) => (tabRefs.current[index] = el)}
                  role="tab"
                  type="button"
                  aria-controls={panelId}
                  data-active={isActive}
                  aria-expanded={isActive}
                  className={cn(
                    'flex w-full items-center justify-between py-2 text-left font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
                    colorClasses[color].accordion,
                    !isActive && 'text-muted-foreground',
                  )}
                  onClick={() => setActive((prev) => (prev === index ? -1 : index))}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    size={16}
                    className={cn('transition-transform', isActive && 'rotate-180')}
                  />
                </button>
                {isActive && (
                  <div
                    id={panelId}
                    role="tabpanel"
                    aria-labelledby={id}
                    className="pt-1 pb-2 text-sm"
                  >
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn(orientationClasses, className)} {...props}>
        <div role="tablist" aria-orientation={orientation} onKeyDown={handleKeyDown} className={listClasses}>
          {items.map((item, index) => {
            const id = item.id ?? `tab-${index}`;
            const panelId = `${id}-panel`;
            return (
              <button
                key={id}
                id={id}
                ref={(el) => (tabRefs.current[index] = el)}
                role="tab"
                type="button"
                data-active={active === index}
                aria-selected={active === index}
                aria-controls={panelId}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
                  variant === 'underline' ? 'border-b-2 border-transparent' : 'rounded-md',
                  colorClasses[color][variant],
                  active === index ? '' : 'text-muted-foreground',
                )}
                onClick={() => setActive(index)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <div className={panelClasses}>
          {items.map((item, index) => {
            const id = item.id ?? `tab-${index}`;
            const panelId = `${id}-panel`;
            return (
              <div
                key={panelId}
                id={panelId}
                role="tabpanel"
                aria-labelledby={id}
                hidden={active !== index}
              >
                {item.content}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
Tabs.displayName = 'Tabs';

export type { TabItem };
