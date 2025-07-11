import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipProps } from './Tooltip';
import { Button } from '@/atoms/Button/Button';

interface TooltipStoryProps extends TooltipProps {
  label?: string;
}

const meta: Meta<TooltipStoryProps> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success'],
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    content: { control: 'text' },
    label: { control: 'text' },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    content: 'Tooltip content',
    label: 'Hover me',
  },
  render: ({ label, ...args }) => (
    <Tooltip {...args}>
      <Button intent="secondary">{label}</Button>
    </Tooltip>
  ),
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Placements: Story = {
  render: (args) => (
    <div className="flex gap-8 items-center justify-center flex-wrap">
      <Tooltip {...args} placement="top">
        <Button intent="secondary">Top</Button>
      </Tooltip>
      <Tooltip {...args} placement="bottom">
        <Button intent="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip {...args} placement="left">
        <Button intent="secondary">Left</Button>
      </Tooltip>
      <Tooltip {...args} placement="right">
        <Button intent="secondary">Right</Button>
      </Tooltip>
    </div>
  ),
};

export const Intents: Story = {
  render: (args) => (
    <div className="flex gap-4 flex-wrap">
      <Tooltip {...args} intent="primary">
        <Button intent="primary">Primary</Button>
      </Tooltip>
      <Tooltip {...args} intent="secondary">
        <Button intent="secondary">Secondary</Button>
      </Tooltip>
      <Tooltip {...args} intent="tertiary">
        <Button intent="tertiary">Tertiary</Button>
      </Tooltip>
      <Tooltip {...args} intent="quaternary">
        <Button intent="quaternary">Quaternary</Button>
      </Tooltip>
      <Tooltip {...args} intent="success">
        <Button intent="success">Success</Button>
      </Tooltip>
    </div>
  ),
};
