import type { Meta, StoryObj } from '@storybook/react';
import { TimelineItem, TimelineItemProps } from './TimelineItem';
import { iconMap, type IconName } from '@/atoms/Icon';

interface TimelineStoryProps extends TimelineItemProps {
  iconName: IconName;
}

const iconOptions = Object.keys(iconMap) as IconName[];

const meta: Meta<TimelineStoryProps> = {
  title: 'Molecules/TimelineItem',
  component: TimelineItem,
  tags: ['autodocs'],
  argTypes: {
    iconName: { control: 'select', options: iconOptions },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success', 'destructive'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
    date: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconName: 'Clock',
    title: 'Pedido entregado',
    description: 'El pedido #1042 fue entregado al cliente',
    date: '05/07/2025 14:32',
    color: 'primary',
  },
};
