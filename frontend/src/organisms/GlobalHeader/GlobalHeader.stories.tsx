import type { Meta, StoryObj } from '@storybook/react';
import { GlobalHeader, type GlobalHeaderProps } from './GlobalHeader';

const meta: Meta<GlobalHeaderProps> = {
  title: 'Organisms/GlobalHeader',
  component: GlobalHeader,
  tags: ['autodocs'],
  argTypes: {
    logo: { control: 'text' },
    title: { control: 'text' },
    navItems: { control: 'object' },
    actionLabel: { control: 'text' },
    notificationsCount: { control: 'number' },
    variant: { control: 'select', options: ['solid', 'glass'] },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'tertiary'],
    },
    divider: { control: 'boolean' },
    onNavigate: { action: 'navigate', table: { category: 'Events' } },
    onSearch: { action: 'search', table: { category: 'Events' } },
    onNotificationsOpen: {
      action: 'notificationsOpen',
      table: { category: 'Events' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const navItems = [
    { label: 'Panel', iconName: 'LayoutDashboard', path: '/panel' },
    {
        label: 'Gestión de Productos',
        iconName: 'Package',
        children: [
            { label: 'Productos & Catálogo', path: '/productos' },
            { label: 'Inventario', path: '/inventario' },
        ]
    },
    {
        label: 'Operaciones de Venta',
        iconName: 'ShoppingCart',
        children: [
            { label: 'Compras & Abastecimiento', path: '/compras' },
            { label: 'Ventas & Pedidos', path: '/ventas' },
        ]
    },
    {
        label: 'Clientes',
        iconName: 'Users',
        children: [
            { label: 'CRM & Atención', path: '/crm' },
            { label: 'CDP & Audiencias', path: '/cdp' },
        ]
    },
    { label: 'Marketing & Campañas', iconName: 'Megaphone', path: '/marketing' },
    { label: 'Logística & Fulfillment', iconName: 'Truck', path: '/logistica' },
    {
        label: 'Administración',
        iconName: 'Settings',
        children: [
            { label: 'Finanzas & Contabilidad', path: '/finanzas' },
            { label: 'Analytics & BI', path: '/analytics' },
            { label: 'Integraciones', path: '/integraciones' },
            { label: 'Configuración', path: '/configuracion' },
        ]
    },
    {
        label: 'Soporte',
        iconName: 'HelpCircle',
        children: [
            { label: 'Ayuda & Soporte', path: '/ayuda' },
        ]
    }
];

export const Default: Story = {
  args: {
    logo: 'Fashion',
    title: 'ERP',
    navItems: navItems,
    actionLabel: 'New order',
    notificationsCount: 3,
    userName: 'Jane Doe',
    userMenuItems: [
      { label: 'Profile' },
      { label: 'Logout' },
    ],
    divider: true,
  },
};

export const MobileCollapsed: Story = {
  ...Default,
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
