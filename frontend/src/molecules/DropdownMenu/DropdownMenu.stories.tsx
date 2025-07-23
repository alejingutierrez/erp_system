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
    variant: { control: 'select', options: ['default', 'outline', 'ghost', 'glass', 'icon'] },
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    selectedId: { control: 'text' },
    onSelect: { action: 'select', table: { category: 'Events' } },
    onOpenChange: { action: 'openChange', table: { category: 'Events' } },
    onSelectedIdChange: { action: 'selectedChange', table: { category: 'Events' } },
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
    variant: 'outline',
    intent: 'primary',
    size: 'md',
  },
};

export const WithSelected: Story = {
  args: {
    triggerLabel: 'Selected',
    items: [
      { label: 'Settings', iconName: 'Settings', id: 'settings' },
      { label: 'Logout', iconName: 'LogOut', id: 'logout' },
    ],
    selectedId: 'settings',
  },
};
