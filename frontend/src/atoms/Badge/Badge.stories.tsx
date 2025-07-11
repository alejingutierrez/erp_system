import type { Meta, StoryObj } from '@storybook/react';
import { Badge, BadgeProps } from './Badge';

const meta: Meta<BadgeProps> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'success', 'warning', 'destructive', 'info'],
    },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Badge' },
};

export const Variants: Story = {
  render: (args) => (
    <div className="space-x-2">
      <Badge {...args} variant="success">Success</Badge>
      <Badge {...args} variant="warning">Warning</Badge>
      <Badge {...args} variant="destructive">Error</Badge>
      <Badge {...args} variant="info">Info</Badge>
      <Badge {...args} variant="neutral">Neutral</Badge>
    </div>
  ),
  args: {},
};
