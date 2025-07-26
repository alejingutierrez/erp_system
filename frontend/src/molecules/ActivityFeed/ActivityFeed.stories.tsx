import type { Meta, StoryObj } from '@storybook/react';
import { ActivityFeed, type Activity, ActivityFeedProps } from './ActivityFeed';

const meta: Meta<ActivityFeedProps> = {
  title: 'Molecules/ActivityFeed',
  component: ActivityFeed,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const sampleItems: Activity[] = [
  {
    id: '1',
    date: new Date('2025-07-05T14:32:00'),
    content: 'Pedido #1042 entregado',
    icon: 'Check',
  },
  {
    id: '2',
    date: new Date('2025-07-05T10:15:00'),
    content: 'Pedido #1042 enviado',
    icon: 'Truck',
  },
  {
    id: '3',
    date: new Date('2025-07-04T09:00:00'),
    content: 'Pedido #1042 creado',
    icon: 'Plus',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};
