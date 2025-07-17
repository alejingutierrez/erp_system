import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProps } from './Toast';

const meta: Meta<ToastProps> = {
  title: 'Atoms/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    intent: { control: 'select', options: ['info', 'success', 'error'] },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    },
    duration: { control: 'number' },
    showClose: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'This is a toast message' },
};

export const Success: Story = {
  args: { intent: 'success', children: 'Saved successfully!' },
};

export const Error: Story = {
  args: { intent: 'error', children: 'Something went wrong' },
};
