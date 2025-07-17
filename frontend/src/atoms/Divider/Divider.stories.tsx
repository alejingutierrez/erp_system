import type { Meta, StoryObj } from '@storybook/react';
import { Divider, DividerProps } from './Divider';

const meta: Meta<DividerProps> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    spacing: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'tertiary', 'quaternary', 'success', 'destructive'],
    },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {},
  render: (args) => (
    <div>
      <p>First section</p>
      <Divider {...args} />
      <p>Second section</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical', spacing: 'md', color: 'quaternary' },
  render: (args) => (
    <div className="flex items-center h-10">
      <span>Left</span>
      <Divider {...args} />
      <span>Right</span>
    </div>
  ),
};
