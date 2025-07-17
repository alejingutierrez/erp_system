import type { Meta, StoryObj } from '@storybook/react';
import { NavItem, NavItemProps } from './NavItem';
import { iconMap, type IconName } from '@/atoms/Icon';

interface NavItemStoryProps extends NavItemProps {
  iconName: IconName;
}

const iconOptions = Object.keys(iconMap) as IconName[];

const meta: Meta<NavItemStoryProps> = {
  title: 'Molecules/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  argTypes: {
    iconName: { control: 'select', options: iconOptions },
    label: { control: 'text' },
    active: { control: 'boolean' },
    showBadge: { control: 'boolean' },
    badgeCount: { control: 'number' },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconName: 'Home',
    label: 'Inicio',
    active: false,
    showBadge: false,
    badgeCount: 0,
  },
};

export const Active: Story = {
  args: {
    iconName: 'Home',
    label: 'Inicio',
    active: true,
  },
};

export const WithBadge: Story = {
  args: {
    iconName: 'Mail',
    label: 'Mensajes',
    showBadge: true,
    badgeCount: 3,
  },
};
