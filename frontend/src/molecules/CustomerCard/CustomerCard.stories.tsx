import type { Meta, StoryObj } from '@storybook/react';
import { CustomerCard, CustomerCardProps } from './CustomerCard';

const meta: Meta<CustomerCardProps> = {
  title: 'Molecules/CustomerCard',
  component: CustomerCard,
  tags: ['autodocs'],
  argTypes: {
    nombre: { control: 'text' },
    avatarSrc: { control: 'text' },
    infoSecundaria: { control: 'text' },
    nivel: {
      control: 'select',
      options: [undefined, 'VIP', 'Frecuente', 'Nuevo'],
    },
    mostrarAccion: { control: 'boolean' },
    accionIntent: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success'],
    },
    accionIconName: { control: 'text' },
    actionOptions: { control: 'object' },
    onSelect: { action: 'selected' },
    onAction: { action: 'actionClicked' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    nombre: 'María Gómez',
    avatarSrc: '',
    infoSecundaria: 'maria@gmail.com',
    nivel: 'VIP',
    mostrarAccion: false,
  },
};

export const ConAccion: Story = {
  args: {
    nombre: 'Pedro Ruiz',
    infoSecundaria: 'pedro@example.com',
    mostrarAccion: true,
  },
};

export const ConMenuAccion: Story = {
  args: {
    nombre: 'Lucía Pérez',
    infoSecundaria: 'lucia@example.com',
    mostrarAccion: true,
    actionOptions: [
      { label: 'Editar', iconName: 'Edit' },
      { label: 'Eliminar', iconName: 'Trash2' },
    ],
  },
};
