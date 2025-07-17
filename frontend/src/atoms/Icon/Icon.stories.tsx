import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconProps } from './Icon';
import { iconMap, IconName } from './icons';

interface IconStoryProps extends IconProps {
  iconName?: IconName;
}

const iconOptions = Object.keys(iconMap) as IconName[];

const meta: Meta<IconStoryProps> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: {
      control: 'select',
      options: [undefined, 'primary', 'secondary', 'tertiary', 'quaternary', 'success', 'destructive'],
    },
    iconName: { control: 'select', options: iconOptions, name: 'Icon' },
    label: { control: 'text' },
    name: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: ({ iconName, ...args }) => <Icon {...args} name={iconName} />,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { iconName: 'Search' } };
export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Icon {...args} iconName="Search" size="sm" />
      <Icon {...args} iconName="Search" size="md" />
      <Icon {...args} iconName="Search" size="lg" />
    </div>
  ),
  args: {},
};
export const Colors: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Icon {...args} iconName="Heart" color="primary" />
      <Icon {...args} iconName="Heart" color="secondary" />
      <Icon {...args} iconName="Heart" color="tertiary" />
      <Icon {...args} iconName="Heart" color="quaternary" />
      <Icon {...args} iconName="Heart" color="success" />
      <Icon {...args} iconName="Heart" color="destructive" />
    </div>
  ),
  args: {},
};

export const WithLabel: Story = {
  args: { iconName: 'AlertCircle', label: 'Alerta' },
};
