import type { Meta, StoryObj } from '@storybook/react';
import { Input, InputProps } from './Input';
import { iconMap, IconName } from './icons';

interface InputStoryProps extends InputProps {
  leftIconName?: IconName;
  rightIconName?: IconName;
}

const iconOptions = Object.keys(iconMap) as IconName[];

const meta: Meta<InputStoryProps> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    placeholder: { control: 'text' },
    leftIconName: { name: 'Left Icon', control: 'select', options: [undefined, ...iconOptions] },
    rightIconName: { name: 'Right Icon', control: 'select', options: [undefined, ...iconOptions] },
    LeftIcon: { table: { disable: true } },
    RightIcon: { table: { disable: true } },
  },
  render: ({ leftIconName, rightIconName, ...args }) => {
    const LeftIcon = leftIconName ? iconMap[leftIconName] : undefined;
    const RightIcon = rightIconName ? iconMap[rightIconName] : undefined;
    return <Input {...args} LeftIcon={LeftIcon} RightIcon={RightIcon} />;
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { placeholder: 'Enter text' } };
export const WithError: Story = { args: { placeholder: 'Invalid', error: true } };
export const Disabled: Story = { args: { placeholder: 'Disabled', disabled: true } };
export const Small: Story = { args: { size: 'sm', placeholder: 'Small size' } };
export const Large: Story = { args: { size: 'lg', placeholder: 'Large size' } };
