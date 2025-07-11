import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Tooltip, TooltipProps } from './Tooltip';

const meta: Meta<TooltipProps> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success'],
    },
    content: { control: 'text' },
    children: { table: { disable: true } },
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { content: 'Helpful info', placement: 'top', intent: 'primary' },
};

export const Placements: Story = {
  render: (args) => (
    <div className="flex gap-8">
      <Tooltip {...args} placement="top" content="Top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip {...args} placement="right" content="Right">
        <Button variant="outline">Right</Button>
      </Tooltip>
      <Tooltip {...args} placement="bottom" content="Bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip {...args} placement="left" content="Left">
        <Button variant="outline">Left</Button>
      </Tooltip>
    </div>
  ),
  args: { intent: 'primary' },
};
