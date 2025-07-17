import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload, FileUploadProps } from './FileUpload';

const meta: Meta<FileUploadProps> = {
  title: 'Atoms/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
    buttonText: { control: 'text' },
    multiple: { control: 'boolean' },
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success'],
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost', 'glass', 'icon'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    onChange: { action: 'changed', table: { category: 'Events' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Multiple: Story = {
  args: { multiple: true },
};
