import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ConfirmationDialog, type ConfirmationDialogProps } from './ConfirmationDialog';
import { Button } from '@/atoms/Button/Button';

const meta: Meta<ConfirmationDialogProps> = {
  title: 'Molecules/ConfirmationDialog',
  component: ConfirmationDialog,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    message: { control: 'text' },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    danger: { control: 'boolean' },
    onConfirm: { action: 'confirm', table: { category: 'Events' } },
    onCancel: { action: 'cancel', table: { category: 'Events' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Eliminar elemento',
    message: '¿Estás seguro de que deseas continuar?',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir</Button>
        <ConfirmationDialog
          {...args}
          isOpen={open}
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </>
    );
  },
};

export const Danger: Story = {
  args: {
    title: 'Eliminar registro',
    message: 'Esta acción no se puede deshacer. ¿Desea continuar?',
    danger: true,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button intent="tertiary" onClick={() => setOpen(true)}>
          Abrir
        </Button>
        <ConfirmationDialog
          {...args}
          isOpen={open}
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </>
    );
  },
};

export const LongMessage: Story = {
  args: {
    title: 'Términos y condiciones',
    message:
      'Este es un mensaje largo para verificar que el diálogo se adapte correctamente al contenido. '.repeat(3),
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir</Button>
        <ConfirmationDialog
          {...args}
          isOpen={open}
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </>
    );
  },
};
