import type { Meta, StoryObj } from '@storybook/react';
import { UserProfile, type UserProfileProps } from './UserProfile';

const meta: Meta<UserProfileProps> = {
  title: 'Molecules/UserProfile',
  component: UserProfile,
  tags: ['autodocs'],
  argTypes: {
    userName: { control: 'text' },
    avatarSrc: { control: 'text' },
    showDropdownIcon: { control: 'boolean' },
    status: { control: 'select', options: ['online', 'offline', 'away'] },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: 'Juan Perez',
    avatarSrc: 'https://placehold.co/40',
    showDropdownIcon: true,
  },
};

export const WithStatus: Story = {
  args: {
    userName: 'Maria Rodriguez',
    avatarSrc: 'https://placehold.co/40',
    status: 'online',
    showDropdownIcon: true,
  },
};

export const NoImage: Story = {
  args: {
    userName: 'No Avatar',
    avatarSrc: null,
    showDropdownIcon: true,
  },
};
