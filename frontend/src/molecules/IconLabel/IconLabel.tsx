import * as React from 'react';
import { Icon, type IconName } from '@/atoms/Icon';
import { Text } from '@/atoms/Text';
import { cn } from '@/lib/utils';

export interface IconLabelProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Name of the icon from the design system */
  iconName: IconName;
  /** Text to display next to the icon */
  text: string;
  /** Color variant applied to both icon and text */
  color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'success';
  /** Size of the icon and text */
  size?: 'sm' | 'md' | 'lg';
}

export const IconLabel = React.forwardRef<HTMLSpanElement, IconLabelProps>(
  ({ iconName, text, color, size = 'md', className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('inline-flex items-center space-x-1', className)}
      {...props}
    >
      <Icon name={iconName} size={size} color={color} aria-hidden="true" />
      <Text as="span" size={size} color={color}>
        {text}
      </Text>
    </span>
  ),
);
IconLabel.displayName = 'IconLabel';
