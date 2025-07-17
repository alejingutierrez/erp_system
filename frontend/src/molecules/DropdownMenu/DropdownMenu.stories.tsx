import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu, DropdownMenuProps } from './DropdownMenu';

const meta: Meta<DropdownMenuProps> = {
  title: 'Molecules/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  argTypes: {
    triggerLabel: { control: 'text' },
    items: { control: 'object' },
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    open: { control: 'boolean' },
    onSelect: { action: 'select', table: { category: 'Events' } },
    onOpenChange: { action: 'openChange', table: { category: 'Events' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    triggerLabel: 'Options',
    items: [
      { label: 'Edit', iconName: 'Edit' },
      { label: 'Delete', iconName: 'Trash2' },
    ],
  },
};
