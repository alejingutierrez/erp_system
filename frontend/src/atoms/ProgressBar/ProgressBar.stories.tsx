import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar, ProgressBarProps } from './ProgressBar';

const meta: Meta<ProgressBarProps> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 100 } },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: { control: 'select', options: ['primary','secondary','tertiary','quaternary','success'] },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Determinate: Story = { args: { value: 60 } };

export const Indeterminate: Story = { args: {} };

export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-2">
      <ProgressBar {...args} size="sm" value={50} />
      <ProgressBar {...args} size="md" value={50} />
      <ProgressBar {...args} size="lg" value={50} />
    </div>
  ),
  args: {},
};

export const Colors: Story = {
  render: (args) => (
    <div className="space-y-2">
      <ProgressBar {...args} color="primary" value={70} />
      <ProgressBar {...args} color="secondary" value={70} />
      <ProgressBar {...args} color="tertiary" value={70} />
      <ProgressBar {...args} color="quaternary" value={70} />
      <ProgressBar {...args} color="success" value={70} />
    </div>
  ),
  args: {},
};
