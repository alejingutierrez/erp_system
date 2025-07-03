import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { Spinner } from '@/atoms/Spinner/Spinner';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'border-transparent',
        outline: 'border bg-transparent',
        ghost: 'bg-transparent border-transparent',
        glass: 'bg-surface-glass/80 backdrop-blur-lg border border-white/20 shadow-glass text-foreground',
        icon: 'p-0 border-transparent',
      },
      intent: {
        primary: 'text-primary-foreground',
        secondary: 'text-secondary-foreground',
        tertiary: 'text-tertiary-foreground',
        quaternary: 'text-quaternary-foreground',
        success: 'text-success-foreground',
      },
      size: {
        sm: 'h-9',
        md: 'h-10',
        lg: 'h-11',
      },
    },
    compoundVariants: [
      // Default variant styles
      { variant: 'default', intent: 'primary', className: 'bg-gradient-to-br from-primary to-primary/90' },
      { variant: 'default', intent: 'secondary', className: 'bg-gradient-to-br from-secondary to-secondary/80' },
      { variant: 'default', intent: 'tertiary', className: 'bg-tertiary hover:bg-tertiary/90' },
      { variant: 'default', intent: 'quaternary', className: 'bg-quaternary hover:bg-quaternary/90' },
      { variant: 'default', intent: 'success', className: 'bg-success hover:bg-success/90' },
      { variant: 'default', size: 'sm', className: 'px-4 min-w-[8rem]' },
      { variant: 'default', size: 'md', className: 'px-6 min-w-[10rem]' },
      { variant: 'default', size: 'lg', className: 'px-8 min-w-[12rem]' },
      // Icon variant styles
      { variant: 'icon', size: 'sm', className: 'w-9' },
      { variant: 'icon', size: 'md', className: 'w-10' },
      { variant: 'icon', size: 'lg', className: 'w-11' },
      { variant: 'icon', intent: 'primary', className: 'text-primary' },
      { variant: 'icon', intent: 'secondary', className: 'text-secondary' },
      { variant: 'icon', intent: 'tertiary', className: 'text-tertiary' },
      { variant: 'icon', intent: 'quaternary', className: 'text-quaternary' },
      { variant: 'icon', intent: 'success', className: 'text-success' },
      // Outline variant styles
      { variant: 'outline', intent: 'primary', className: 'border-primary text-primary hover:bg-primary hover:text-primary-foreground' },
      { variant: 'outline', intent: 'secondary', className: 'border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground' },
      { variant: 'outline', intent: 'tertiary', className: 'border-tertiary text-tertiary hover:bg-tertiary hover:text-tertiary-foreground' },
      { variant: 'outline', intent: 'quaternary', className: 'border-quaternary text-quaternary hover:bg-quaternary hover:text-quaternary-foreground' },
      { variant: 'outline', intent: 'success', className: 'border-success text-success hover:bg-success hover:text-success-foreground' },
      { variant: 'outline', size: 'sm', className: 'px-4 min-w-[8rem]' },
      { variant: 'outline', size: 'md', className: 'px-6 min-w-[10rem]' },
      { variant: 'outline', size: 'lg', className: 'px-8 min-w-[12rem]' },
      // Ghost variant styles
      { variant: 'ghost', intent: 'primary', className: 'text-primary hover:bg-primary/10' },
      { variant: 'ghost', intent: 'secondary', className: 'text-secondary hover:bg-secondary/10' },
      { variant: 'ghost', intent: 'tertiary', className: 'text-tertiary hover:bg-tertiary/10' },
      { variant: 'ghost', intent: 'quaternary', className: 'text-quaternary hover:bg-quaternary/10' },
      { variant: 'ghost', intent: 'success', className: 'text-success hover:bg-success/10' },
      { variant: 'ghost', size: 'sm', className: 'px-4 min-w-[8rem]' },
      { variant: 'ghost', size: 'md', className: 'px-6 min-w-[10rem]' },
      { variant: 'ghost', size: 'lg', className: 'px-8 min-w-[12rem]' },
      // Glass variant spacing
      { variant: 'glass', size: 'sm', className: 'px-4 min-w-[8rem]' },
      { variant: 'glass', size: 'md', className: 'px-6 min-w-[10rem]' },
      { variant: 'glass', size: 'lg', className: 'px-8 min-w-[12rem]' },
    ],
    defaultVariants: {
      variant: 'default',
      intent: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  LeftIcon?: React.ElementType;
  RightIcon?: React.ElementType;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      intent,
      size,
      variant,
      asChild = false,
      isLoading = false,
      loadingText,
      LeftIcon,
      RightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const iconSize = size === 'lg' ? 20 : size === 'md' ? 18 : 16;
    const Icon = LeftIcon || RightIcon; // For icon-only variant

    const leftIconAnimation = 'transition-transform duration-300 ease-out group-hover:-translate-x-1';
    const rightIconAnimation = 'transition-transform duration-300 ease-out group-hover:translate-x-1';

    return (
      <Comp
        className={cn(buttonVariants({ intent, size, variant, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner size={size} />
            {loadingText && <span className="ml-2 animate-pulse">{loadingText}</span>}
          </div>
        ) : variant === 'icon' ? (
          Icon && <Icon size={iconSize} />
        ) : (
          <>
            {LeftIcon && <LeftIcon className={cn('mr-2', leftIconAnimation)} size={iconSize} />}
            {children}
            {RightIcon && <RightIcon className={cn('ml-2', rightIconAnimation)} size={iconSize} />}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
