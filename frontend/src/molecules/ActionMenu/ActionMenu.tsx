import * as React from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from '@/atoms/Button/Button';
import { Icon, iconMap, type IconName } from '@/atoms/Icon';
import { Card } from '@/atoms/Card';
import { Text } from '@/atoms/Text';

const menuVariants = cva(
  'z-50 absolute min-w-[8rem] rounded-md shadow-md',
  {
    variants: {
      position: {
        'bottom-left': 'origin-top-left',
        'bottom-right': 'origin-top-right',
      },
    },
    defaultVariants: {
      position: 'bottom-left',
    },
  },
);

export interface ActionMenuOption {
  /** Text label for the option */
  label: string;
  /** Optional icon for the option */
  iconName?: IconName;
  /** Value passed back on selection */
  value?: string;
}

export interface ActionMenuProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'>,
    VariantProps<typeof menuVariants> {
  /** Options to display */
  options: ActionMenuOption[];
  /** Called when an option is selected */
  onOptionSelect?: (option: ActionMenuOption, index: number) => void;
  /** Called when menu is opened */
  onOpen?: () => void;
  /** Called when menu is closed */
  onClose?: () => void;
  /** Disable trigger button */
  disabled?: boolean;
  /** Show icons next to options */
  showIcons?: boolean;
  /** Icon name for the trigger button */
  iconName?: IconName;
}

export const ActionMenu = React.forwardRef<HTMLButtonElement, ActionMenuProps>(
  (
    {
      options,
      onOptionSelect,
      onOpen,
      onClose,
      position,
      className,
      disabled,
      showIcons = true,
      iconName = 'MoreHorizontal',
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const id = React.useId();

    const handleOpen = React.useCallback(() => {
      if (disabled) return;
      setOpen(true);
      onOpen?.();
    }, [disabled, onOpen]);

    const handleClose = React.useCallback(() => {
      setOpen(false);
      onClose?.();
    }, [onClose]);

    const handleClickOutside = React.useCallback(
      (e: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(e.target as Node) &&
          !triggerRef.current?.contains(e.target as Node)
        ) {
          handleClose();
        }
      },
      [handleClose],
    );

    React.useEffect(() => {
      if (!open) return;
      document.addEventListener('mousedown', handleClickOutside);
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleClose();
      };
      document.addEventListener('keydown', handleKey);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKey);
      };
    }, [open, handleClickOutside, handleClose]);

    const [style, setStyle] = React.useState<React.CSSProperties>();
    const updatePosition = React.useCallback(() => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const top = rect.bottom + 4;
      const left =
        position === 'bottom-right' ? rect.right : rect.left;
      const transform =
        position === 'bottom-right' ? 'translateX(-100%)' : undefined;
      setStyle({ top, left, transform });
    }, [position]);

    React.useEffect(() => {
      if (!open) return;
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }, [open, updatePosition]);

    const menu = (
      <Card
        ref={menuRef}
        variant="glass"
        style={style}
        className={cn(menuVariants({ position, className }), 'bg-white')}
        role="menu"
        aria-labelledby={id}
      >
        <div className="py-1">
          {options.map((option, idx) => (
            <button
              key={idx}
              type="button"
              role="menuitem"
              onClick={() => {
                onOptionSelect?.(option, idx);
                handleClose();
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-muted focus:bg-muted focus:outline-none"
            >
              {showIcons && option.iconName && (
                <Icon name={option.iconName} size="sm" aria-hidden="true" />
              )}
              <Text as="span" size="sm">
                {option.label}
              </Text>
            </button>
          ))}
        </div>
      </Card>
    );

    return (
      <>
        <Button
          variant="icon"
          size="sm"
          ref={triggerRef}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={id}
          onClick={open ? handleClose : handleOpen}
          disabled={disabled}
          LeftIcon={iconMap[iconName]}
          {...props}
        />
        {open && createPortal(menu, document.body)}
      </>
    );
  },
);
ActionMenu.displayName = 'ActionMenu';

export { menuVariants };
