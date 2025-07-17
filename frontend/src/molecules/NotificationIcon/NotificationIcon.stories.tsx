import type { Meta, StoryObj } from '@storybook/react';
import { NotificationIcon, NotificationIconProps } from './NotificationIcon';
import { iconMap, type IconName } from '@/atoms/Icon';

interface NotificationIconStoryProps extends NotificationIconProps {
  iconName: IconName;
}

const iconOptions = Object.keys(iconMap) as IconName[];

const meta: Meta<NotificationIconStoryProps> = {
  title: 'Molecules/NotificationIcon',
  component: NotificationIcon,
  tags: ['autodocs'],
  argTypes: {
    iconName: { control: 'select', options: iconOptions },
    count: { control: 'number' },
    color: {
      control: 'select',
      options: ['neutral', 'success', 'warning', 'destructive', 'info'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconName: 'Bell',
    count: 3,
    color: 'destructive',
    size: 'md',
  },
};

export const NoNotifications: Story = {
  args: {
    iconName: 'Bell',
    count: 0,
  },
};

export const Many: Story = {
  args: {
    iconName: 'Bell',
    count: 120,
  },
};
