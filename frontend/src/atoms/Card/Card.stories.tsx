import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardProps } from './Card';

const meta: Meta<CardProps> = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['shadow', 'outline', 'glass'] },
    clickable: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Simple card' },
};

export const Variants: Story = {
  render: (args) => (
    <div className="space-y-4">
      <Card {...args} variant="outline">Outline card</Card>
      <Card {...args} variant="shadow">Shadow card</Card>
      <Card {...args} variant="glass">Glass card</Card>
    </div>
  ),
  args: { clickable: false },
};

export const Clickable: Story = {
  args: { clickable: true, children: 'Clickable card' },
};
