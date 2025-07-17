import type { Meta, StoryObj } from '@storybook/react';
import { OrderListItem, OrderListItemProps } from './OrderListItem';

const meta: Meta<OrderListItemProps> = {
  title: 'Molecules/OrderListItem',
  component: OrderListItem,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['Pendiente', 'Enviado', 'Entregado', 'Cancelado'],
    },
    orderId: { control: 'text' },
    date: { control: 'text' },
    customerName: { control: 'text' },
    total: { control: 'text' },
    showActions: { control: 'boolean' },
    onClick: { action: 'clicked' },
    onActionSelect: { action: 'action selected' },
    onStatusClick: { action: 'status clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orderId: '1001',
    date: '01/09/2025',
    customerName: 'Juan Perez',
    total: '$250.00',
    status: 'Pendiente',
    showActions: false,
  },
};

export const WithActions: Story = {
  args: {
    orderId: '1001',
    date: '01/09/2025',
    customerName: 'Juan Perez',
    total: '$250.00',
    status: 'Pendiente',
    showActions: true,
  },
};
