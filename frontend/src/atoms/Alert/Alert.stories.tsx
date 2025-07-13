import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertProps } from './Alert';

const meta: Meta<AlertProps> = {
  title: 'Atoms/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    title: { control: 'text' },
    dismissable: { control: 'boolean' },
    children: { control: 'text' },
    onClose: { action: 'closed', table: { category: 'Events' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Información',
    children: 'Su sesión expirará pronto.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Éxito',
    children: 'Cliente guardado con éxito.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Advertencia',
    children: 'Falta completar un campo.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'Error al cargar datos.',
  },
};

export const Dismissable: Story = {
  args: {
    variant: 'info',
    title: 'Notificación',
    children: 'Puede cerrar este mensaje.',
    dismissable: true,
  },
};

