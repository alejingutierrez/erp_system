import type { Meta, StoryObj } from '@storybook/react';
import { OrderItem, type OrderItemProps, type OrderStatus } from './OrderItem';

const statusOptions: OrderStatus[] = ['Entregado', 'Pendiente', 'Cancelado', 'En ruta'];

const meta: Meta<OrderItemProps> = {
  title: 'Molecules/OrderItem',
  component: OrderItem,
  tags: ['autodocs'],
  argTypes: {
    orderId: { control: 'text' },
    date: { control: 'text' },
    total: { control: 'text' },
    status: { control: 'select', options: statusOptions },
    showIcon: { control: 'boolean' },
    onSelect: { action: 'orderSelected' },
    onActionClick: { action: 'actionClicked' },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orderId: '#1001',
    date: '12/07/2025',
    total: '$250.00',
    status: 'Pendiente',
    showIcon: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    orderId: '#1002',
    date: '15/07/2025',
    total: '$120.00',
    status: 'Entregado',
    showIcon: false,
  },
};

export const WithAction: Story = {
  args: {
    orderId: '#1003',
    date: '18/07/2025',
    total: '$90.00',
    status: 'En ruta',
    showIcon: true,
    onActionClick: () => {},
  },
};
