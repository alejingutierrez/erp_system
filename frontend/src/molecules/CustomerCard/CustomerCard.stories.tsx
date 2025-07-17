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
