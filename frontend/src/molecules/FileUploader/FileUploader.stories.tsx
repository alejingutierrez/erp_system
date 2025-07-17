import type { Meta, StoryObj } from '@storybook/react';
import { FileUploader, FileUploaderProps } from './FileUploader';

const meta: Meta<FileUploaderProps> = {
  title: 'Molecules/FileUploader',
  component: FileUploader,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    multiple: { control: 'boolean' },
    accept: { control: 'text' },
    disabled: { control: 'boolean' },
    onFileSelect: { action: 'file selected', table: { category: 'Events' } },
    onFileRemove: { action: 'file removed', table: { category: 'Events' } },
    onDrop: { action: 'dropped', table: { category: 'Events' } },
    onError: { action: 'error', table: { category: 'Events' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: { disabled: true },
};
