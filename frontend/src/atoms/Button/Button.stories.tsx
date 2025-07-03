import type { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonProps } from './Button';
import { iconMap, IconName } from './icons';

// Define a custom type for the story's args that includes our control-only props
interface ButtonStoryProps extends ButtonProps {
  leftIconName?: IconName;
  rightIconName?: IconName;
}

const iconOptions = Object.keys(iconMap) as IconName[];

const meta: Meta<ButtonStoryProps> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'outline', 'ghost', 'glass', 'icon'] },
    intent: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    isLoading: { control: 'boolean' },
    loadingText: { control: 'text', if: { arg: 'isLoading', eq: true } },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    onClick: { action: 'clicked', table: { category: 'Events' } },
    leftIconName: { name: 'Left Icon', control: { type: 'select' }, options: [undefined, ...iconOptions], table: { category: 'Icons' } },
    rightIconName: { name: 'Right Icon', control: { type: 'select' }, options: [undefined, ...iconOptions], table: { category: 'Icons' } },
    LeftIcon: { table: { disable: true } },
    RightIcon: { table: { disable: true } },
    asChild: { table: { disable: true } },
  },
  render: ({ leftIconName, rightIconName, ...args }) => {
    const LeftIcon = leftIconName ? iconMap[leftIconName] : undefined;
    const RightIcon = rightIconName ? iconMap[rightIconName] : undefined;
    return <Button {...args} LeftIcon={LeftIcon} RightIcon={RightIcon} />;
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// == Intents ==
export const Primary: Story = { args: { intent: 'primary', children: 'Primary Button' } };
export const Secondary: Story = { args: { intent: 'secondary', children: 'Secondary Button' } };
export const Tertiary: Story = { args: { intent: 'tertiary', children: 'Tertiary Button' } };
export const Quaternary: Story = { args: { intent: 'quaternary', children: 'Quaternary Button' } };
export const Success: Story = { args: { intent: 'success', children: 'Success Button' } };

// == Variants ==
export const Outline: Story = { args: { variant: 'outline', intent: 'secondary', children: 'Outline' } };
export const Ghost: Story = { args: { variant: 'ghost', intent: 'primary', children: 'Ghost' } };
export const Glass: Story = {
  args: { variant: 'glass', children: 'Glass Button', leftIconName: 'Star' },
  decorators: [
    (Story) => (
      <div
        className="w-full h-48 p-8 flex items-center justify-center rounded-lg"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1554147090-e1221a04a025?q=80&w=2070&auto=format&fit=crop)',
          backgroundSize: 'cover',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

// == States ==
export const Disabled: Story = { args: { intent: 'primary', disabled: true, children: 'Disabled' } };
export const Loading: Story = { args: { intent: 'primary', isLoading: true, children: 'Hidden' } };
export const LoadingWithText: Story = { args: { intent: 'secondary', isLoading: true, loadingText: 'Saving...', children: 'Hidden' } };

// == Icon Usage ==
export const WithLeftIcon: Story = { args: { intent: 'primary', children: 'Login', leftIconName: 'Mail' } };
export const WithRightIcon: Story = { args: { intent: 'secondary', children: 'Learn More', rightIconName: 'ChevronRight' } };
export const IconOnly: Story = { args: { variant: 'icon', intent: 'primary', leftIconName: 'Heart', 'aria-label': 'Favorite' } };
