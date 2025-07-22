import type { Meta, StoryObj } from '@storybook/react';
import { ActionMenu, type ActionMenuProps } from './ActionMenu';
import { MoreHorizontal } from 'lucide-react';
import { iconMap, type IconName } from '@/atoms/Icon';

interface Props extends ActionMenuProps {
  iconName: IconName;
}

const iconOptions = Object.keys(iconMap) as IconName[];

const meta: Meta<Props> = {
  title: 'Molecules/ActionMenu',
  component: ActionMenu,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    position: { control: 'select', options: ['bottom-left', 'bottom-right'] },
    disabled: { control: 'boolean' },
    showIcons: { control: 'boolean' },
    onOptionSelect: { action: 'option selected' },
    onOpen: { action: 'opened' },
    onClose: { action: 'closed' },
    iconName: { control: 'select', options: iconOptions },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseOptions = [
  { label: 'Edit', iconName: 'Edit' },
  { label: 'Delete', iconName: 'Trash2' },
  { label: 'Duplicate', iconName: 'Copy' },
];

export const Default: Story = {
  args: {
    options: baseOptions,
    showIcons: true,
    iconName: 'MoreHorizontal',
  },
  render: ({ iconName, ...args }) => {
    const Icon = iconMap[iconName];
    return (
      <ActionMenu {...args}>
        <Icon size={16} />
      </ActionMenu>
    );
  },
};

export const Disabled: Story = {
  args: {
    options: baseOptions,
    disabled: true,
    iconName: 'MoreHorizontal',
  },
  render: ({ iconName, ...args }) => {
    const Icon = iconMap[iconName];
    return (
      <ActionMenu {...args}>
        <Icon size={16} />
      </ActionMenu>
    );
  },
};
