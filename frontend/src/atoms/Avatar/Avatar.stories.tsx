import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarProps } from './Avatar';

const meta: Meta<AvatarProps> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: {
      control: 'select',
      options: ['muted', 'primary', 'secondary', 'tertiary', 'quaternary', 'success'],
    },
    src: { control: 'text' },
    name: { control: 'text' },
    alt: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Image: Story = {
  args: {
    src: 'https://placehold.co/100x100',
    alt: 'Avatar',
  },
};

export const Initials: Story = {
  args: {
    name: 'John Doe',
    color: 'primary',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Avatar {...args} size="sm" src="https://placehold.co/40" />
      <Avatar {...args} size="md" src="https://placehold.co/60" />
      <Avatar {...args} size="lg" src="https://placehold.co/100" />
    </div>
  ),
  args: {},
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Avatar {...args} name="AA" color="primary" />
      <Avatar {...args} name="BB" color="secondary" />
      <Avatar {...args} name="CC" color="tertiary" />
      <Avatar {...args} name="DD" color="quaternary" />
      <Avatar {...args} name="EE" color="success" />
    </div>
  ),
  args: {},
};
