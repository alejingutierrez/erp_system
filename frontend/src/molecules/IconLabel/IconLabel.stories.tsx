import type { Meta, StoryObj } from '@storybook/react';
import { IconLabel, IconLabelProps } from './IconLabel';
import { iconMap, type IconName } from '@/atoms/Icon';

interface IconLabelStoryProps extends IconLabelProps {
  iconName: IconName;
}

const iconOptions = Object.keys(iconMap) as IconName[];

const colorOptions = [undefined, 'primary', 'secondary', 'tertiary', 'quaternary', 'success'] as const;

const meta: Meta<IconLabelStoryProps> = {
  title: 'Molecules/IconLabel',
  component: IconLabel,
  tags: ['autodocs'],
  argTypes: {
    iconName: { control: 'select', options: iconOptions },
    text: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: { control: 'select', options: colorOptions },
    onClick: { action: 'iconLabelClicked' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconName: 'Mail',
    text: 'cliente@correo.com',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-2">
      <IconLabel {...args} iconName="Mail" size="sm" text="Peque\u00f1o" />
      <IconLabel {...args} iconName="Mail" size="md" text="Mediano" />
      <IconLabel {...args} iconName="Mail" size="lg" text="Grande" />
    </div>
  ),
  args: {},
};

export const Colors: Story = {
  render: (args) => (
    <div className="space-y-2">
      <IconLabel {...args} iconName="Mail" color="primary" text="Primary" />
      <IconLabel {...args} iconName="Mail" color="secondary" text="Secondary" />
      <IconLabel {...args} iconName="Mail" color="tertiary" text="Tertiary" />
      <IconLabel {...args} iconName="Mail" color="quaternary" text="Quaternary" />
      <IconLabel {...args} iconName="Mail" color="success" text="Success" />
    </div>
  ),
  args: {},
};
