import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, ModalProps } from './Modal';
import { Button } from '../Button/Button';

const meta: Meta<ModalProps> = {
  title: 'Atoms/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'tertiary',
        'quaternary',
        'success',
        'destructive',
        'glass',
      ],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    isOpen: { control: 'boolean' },
    onClose: { action: 'close', table: { category: 'Events' } },
    title: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Simple Modal',
    children: 'Lorem ipsum dolor sit amet.',
  },
};

export const WithActions: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={open} onClose={() => setOpen(false)}>
          <p className="mb-4">Are you sure?</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        </Modal>
      </>
    );
  },
  args: {
    variant: 'glass',
    size: 'md',
    title: 'Confirm',
  },
};

export const ColorVariants: Story = {
  render: (args) => {
    const variants = [
      'primary',
      'secondary',
      'tertiary',
      'quaternary',
      'success',
      'destructive',
    ] as const;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {variants.map((v) => (
          <Modal
            key={v}
            {...args}
            isOpen
            onClose={() => {}}
            variant={v}
            title={v.charAt(0).toUpperCase() + v.slice(1)}
          >
            {v} modal
          </Modal>
        ))}
      </div>
    );
  },
  args: {},
};
