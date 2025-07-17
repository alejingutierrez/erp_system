import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, SpinnerProps } from './Spinner';

const meta: Meta<SpinnerProps> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    intent: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'quaternary',
        'success',
        'destructive',
      ],
    },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
export const Secondary: Story = { args: { intent: 'secondary' } };
export const AllColors: Story = {
  render: (args) => (
    <div className="flex items-center space-x-4">
      <Spinner {...args} intent="primary" />
      <Spinner {...args} intent="secondary" />
      <Spinner {...args} intent="tertiary" />
      <Spinner {...args} intent="quaternary" />
      <Spinner {...args} intent="success" />
      <Spinner {...args} intent="destructive" />
    </div>
  ),
};
