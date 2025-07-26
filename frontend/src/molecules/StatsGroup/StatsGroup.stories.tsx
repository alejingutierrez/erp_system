import type { Meta, StoryObj } from '@storybook/react';
import { StatsGroup, StatsGroupProps } from './StatsGroup';
import { StatCardProps } from '@/molecules/StatCard';

const sampleStats: StatCardProps[] = [
  { value: '120', label: 'Pedidos', iconName: 'Folder', progress: 60, trend: 'up', trendValue: '12%' },
  { value: '$5k', label: 'Ventas', iconName: 'File', progress: 30, trend: 'down', trendValue: '-8%' },
  { value: '24', label: 'Clientes', iconName: 'Users' },
];

const meta: Meta<StatsGroupProps> = {
  title: 'Molecules/StatsGroup',
  component: StatsGroup,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['row', 'column', 'auto'] },
    withDividers: { control: 'boolean' },
    live: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Row: Story = {
  args: {
    stats: sampleStats,
    direction: 'row',
    withDividers: true,
  },
};

export const Column: Story = {
  args: {
    stats: sampleStats,
    direction: 'column',
    withDividers: true,
  },
};

export const AutoResponsive: Story = {
  args: {
    stats: sampleStats,
    direction: 'auto',
    withDividers: true,
  },
};
