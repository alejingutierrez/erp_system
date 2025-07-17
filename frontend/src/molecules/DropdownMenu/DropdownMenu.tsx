import * as React from 'react';
import { createPortal } from 'react-dom';
import { Icon, type IconName } from '@/atoms/Icon';
import { Button } from '@/atoms/Button/Button';
import { cn } from '@/lib/utils';

export interface DropdownMenuItem {
  label: string;
  iconName?: IconName;
  disabled?: boolean;
  id?: string | number;
}

export interface DropdownMenuProps {
  /** Content for the trigger button */
  triggerLabel: React.ReactNode;
  /** List of menu items */
  items: DropdownMenuItem[];
  /** Placement of the menu relative to the trigger */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Alignment relative to the trigger */
  align?: 'start' | 'center' | 'end';
  /** Controlled open state */
  open?: boolean;
  /** Callback when an option is selected */
  onSelect?: (item: DropdownMenuItem) => void;
  /** Callback when menu opens/closes */
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  triggerLabel,
  items,
  placement = 'bottom',
  align = 'start',
  open,
  onSelect,
  onOpenChange,
  className,
}) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const [style, setStyle] = React.useState<React.CSSProperties>();

  const updatePosition = React.useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const spacing = 4;
    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = rect.top - spacing;
        break;
      case 'bottom':
        top = rect.bottom + spacing;
        break;
      case 'left':
        top = rect.top;
        left = rect.left - spacing;
        break;
      case 'right':
        top = rect.top;
        left = rect.right + spacing;
        break;
      default:
        top = rect.bottom + spacing;
    }

    if (placement === 'top' || placement === 'bottom') {
      if (align === 'start') {
        left = rect.left;
      } else if (align === 'center') {
        left = rect.left + rect.width / 2;
      } else {
        left = rect.right;
      }
    } else {
      // left or right placement
      if (align === 'start') {
        top = rect.top;
      } else if (align === 'center') {
        top = rect.top + rect.height / 2;
      } else {
        top = rect.bottom;
      }
    }

    let transform = '';
    if (placement === 'top') {
      transform = align === 'center' ? 'translate(-50%, -100%)' : 'translate(0, -100%)';
    } else if (placement === 'bottom') {
      transform = align === 'center' ? 'translate(-50%, 0)' : 'translate(0, 0)';
    } else if (placement === 'left') {
      transform = align === 'center' ? 'translate(-100%, -50%)' : 'translate(-100%, 0)';
    } else {
      transform = align === 'center' ? 'translate(0, -50%)' : 'translate(0, 0)';
    }

    setStyle({ top, left, transform });
  }, [placement, align]);

  const toggleOpen = () => {
    const newOpen = !isOpen;
    if (!isControlled) setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const close = () => {
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
  };

  const handleSelect = (item: DropdownMenuItem) => {
    if (item.disabled) return;
    onSelect?.(item);
    close();
  };

  React.useEffect(() => {
    if (!isOpen) return;
    updatePosition();
    const handleClick = (e: MouseEvent) => {
      if (!triggerRef.current) return;
      if (!triggerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, updatePosition]);

  return (
    <>
      <Button
        variant="outline"
        ref={triggerRef}
        onClick={toggleOpen}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {triggerLabel}
      </Button>
      {isOpen &&
        createPortal(
          <div
            role="menu"
            style={style}
            className={cn(
              'absolute z-50 min-w-[8rem] rounded-md border border-border bg-white shadow-md',
              className,
            )}
          >
            {items.map((item) => (
              <button
                key={item.id ?? item.label}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => handleSelect(item)}
                className={cn(
                  'flex w-full items-center gap-2 px-3 py-2 text-sm text-left hover:bg-muted disabled:opacity-50',
                )}
              >
                {item.iconName && <Icon name={item.iconName} size="sm" aria-hidden="true" />}
                <span className="flex-1">{item.label}</span>
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
};

DropdownMenu.displayName = 'DropdownMenu';
