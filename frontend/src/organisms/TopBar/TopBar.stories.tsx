import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from './TopBar';

const meta: Meta<typeof TopBar> = {
  title: 'Organisms/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  argTypes: {
    notificationsCount: { control: 'number' },
    onSearch: { action: 'search' },
    onNotificationsOpen: { action: 'notificationsOpen' },
    userName: { control: 'text' },
    userAvatarSrc: { control: 'text' },
    userMenuItems: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    notificationsCount: 3,
    userName: 'Jane Doe',
    userMenuItems: [
      { label: 'Profile' },
      { label: 'Logout' },
    ],
  },
};

export const WithNotifications: Story = {
  args: {
    ...Default.args,
    notificationsCount: 8,
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    color: 'primary',
    variant: 'glass',
  },
};
