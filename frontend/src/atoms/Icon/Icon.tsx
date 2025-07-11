import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { iconMap, type IconName } from './icons';

const iconVariants = cva('inline-block align-middle', {
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      tertiary: 'text-tertiary',
      quaternary: 'text-quaternary',
      success: 'text-success',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'name'>,
    VariantProps<typeof iconVariants> {
  /** Name of the icon from the iconMap */
  name?: IconName;
  /** Accessible label. If provided, the icon will be announced */
  label?: string;
  /** Pass a custom SVG element instead of using name */
  children?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, children, size, color, className, label, ...props }, ref) => {
    const Svg = name ? iconMap[name] : undefined;

    const mergedProps = {
      className: cn(iconVariants({ size, color }), className),
      'aria-hidden': label ? undefined : 'true',
      'aria-label': label,
      focusable: 'false',
      ref,
      ...props,
    } as React.SVGProps<SVGSVGElement>;

    if (children) {
      return React.cloneElement(children, mergedProps);
    }
    if (Svg) {
      return <Svg {...mergedProps} />;
    }
    return null;
  },
);
Icon.displayName = 'Icon';

export { iconVariants };
