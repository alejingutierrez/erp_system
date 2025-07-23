import type { Meta, StoryObj } from '@storybook/react';
import { ImageUploader, type ImageUploaderProps } from './ImageUploader';

const meta: Meta<ImageUploaderProps> = {
  title: 'Molecules/ImageUploader',
  component: ImageUploader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Click the preview grid to open the file dialog again and add more images.',
      },
    },
  },
  argTypes: {
    multiple: { control: 'boolean' },
    imagenesIniciales: { control: 'text' },
    labelBoton: { control: 'text' },
    maxImagenes: { control: 'number' },
    onUpload: { action: 'onUpload', table: { category: 'Events' } },
    onRemoveImage: { action: 'onRemoveImage', table: { category: 'Events' } },
    onMaxExceeded: { action: 'onMaxExceeded', table: { category: 'Events' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const parseImages = (val?: string | string[]) => {
  if (Array.isArray(val)) return val;
  if (!val) return [];
  try {
    const parsed = JSON.parse(val);
    if (Array.isArray(parsed)) return parsed as string[];
  } catch {
    // fallthrough
  }
  return val.split(',').map((s) => s.trim()).filter(Boolean);
};

export const Default: Story = {
  render: (args) => (
    <ImageUploader {...args} imagenesIniciales={parseImages(args.imagenesIniciales)} />
  ),
  args: {},
};

export const Multiple: Story = {
  render: (args) => (
    <ImageUploader {...args} imagenesIniciales={parseImages(args.imagenesIniciales)} />
  ),
  args: { multiple: true },
};

export const WithInitialImages: Story = {
  render: (args) => (
    <ImageUploader {...args} imagenesIniciales={parseImages(args.imagenesIniciales)} />
  ),
  args: {
    imagenesIniciales: [
      'https://placehold.co/80x80',
      'https://placehold.co/80x80?text=2',
    ],
    multiple: true,
  },
};
