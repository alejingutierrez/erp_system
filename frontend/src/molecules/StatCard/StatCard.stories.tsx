import type { Meta, StoryObj } from '@storybook/react';
import { StatCard, StatCardProps } from './StatCard';
import { iconMap, type IconName } from '@/atoms/Icon';

interface StatCardStoryProps extends StatCardProps {
  iconName?: IconName;
}

const iconOptions = Object.keys(iconMap) as IconName[];

const meta: Meta<StatCardStoryProps> = {
  title: 'Molecules/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    iconName: { control: 'select', options: iconOptions },
    trend: { control: 'select', options: ['up', 'down'] },
    trendValue: { control: 'text' },
    progress: { control: 'number' },
    variant: { control: 'select', options: ['shadow', 'outline', 'glass'] },
    clickable: { control: 'boolean' },
    onClick: { action: 'clicked', table: { category: 'Events' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '120',
    label: 'Nuevos Pedidos',
    iconName: 'Folder',
    variant: 'shadow',
    clickable: false,
    progress: 60,
    trend: 'up',
    trendValue: '12%',
  },
};

export const Clickable: Story = {
  args: {
    value: '$5,000',
    label: 'Ventas',
    iconName: 'File',
    clickable: true,
    trend: 'down',
    trendValue: '-8%',
    progress: 30,
  },
};
