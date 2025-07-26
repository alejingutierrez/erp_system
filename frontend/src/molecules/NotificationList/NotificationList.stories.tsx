import type { Meta, StoryObj } from '@storybook/react';
import { NotificationList, NotificationListProps, Notification } from './NotificationList';

const baseNotifications: Notification[] = [
  {
    id: '1',
    title: 'Bienvenido',
    message: 'Gracias por registrarte',
    date: new Date('2025-06-01T10:00:00'),
    read: false,
    type: 'info',
  },
  {
    id: '2',
    title: 'Pedido entregado',
    message: 'Tu pedido #123 fue entregado',
    date: new Date('2025-06-02T12:00:00'),
    read: true,
    type: 'success',
  },
  {
    id: '3',
    title: 'Alerta de inventario',
    message: 'Quedan pocas unidades del producto X',
    date: new Date('2025-06-03T09:30:00'),
    read: false,
    type: 'warning',
  },
];

const meta: Meta<NotificationListProps> = {
  title: 'Molecules/NotificationList',
  component: NotificationList,
  tags: ['autodocs'],
  argTypes: {
    notifications: { control: 'object' },
    maxVisible: { control: 'number' },
    onItemClick: { action: 'item clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = { args: { notifications: [] } };

export const Mixed: Story = { args: { notifications: baseNotifications } };

export const ManyItems: Story = {
  args: {
    notifications: [
      ...baseNotifications,
      {
        id: '4',
        title: 'Nuevo mensaje',
        message: 'Tienes un mensaje sin leer',
        date: new Date('2025-06-04T11:15:00'),
        read: false,
        type: 'destructive',
      },
      {
        id: '5',
        title: 'Actualización',
        message: 'Se actualizó tu perfil',
        date: new Date('2025-06-05T08:00:00'),
        read: true,
        type: 'info',
      },
    ],
    maxVisible: 3,
  },
};
