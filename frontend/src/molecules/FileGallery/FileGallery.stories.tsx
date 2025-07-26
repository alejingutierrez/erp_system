import type { Meta, StoryObj } from '@storybook/react';
import { FileGallery, type FileGalleryProps, type FileItem } from './FileGallery';

const sampleImages: FileItem[] = [
  {
    id: '1',
    name: 'image1.png',
    url: 'https://placehold.co/80x80',
    type: 'image',
  },
  {
    id: '2',
    name: 'image2.png',
    url: 'https://placehold.co/80x80?text=2',
    type: 'image',
  },
];

const mixedFiles: FileItem[] = [
  ...sampleImages,
  {
    id: '3',
    name: 'document.pdf',
    url: '#',
    type: 'doc',
  },
];

const meta: Meta<FileGalleryProps> = {
  title: 'Molecules/FileGallery',
  component: FileGallery,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success'] },
    onPreview: { action: 'preview', table: { category: 'Events' } },
    onDelete: { action: 'delete', table: { category: 'Events' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items: sampleImages },
};

export const Mixed: Story = {
  args: { items: mixedFiles },
};
