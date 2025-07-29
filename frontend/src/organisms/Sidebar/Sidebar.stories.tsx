import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean' },
    navItems: { control: 'object' },
    onNavigate: { action: 'navigate' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
    { label: 'Panel', iconName: 'LayoutDashboard', path: '/panel' },
    { label: 'Productos & Catálogo', iconName: 'Package', path: '/productos' },
    { label: 'Inventario', iconName: 'Warehouse', path: '/inventario' },
    { label: 'Compras & Abastecimiento', iconName: 'ShoppingCart', path: '/compras' },
    { label: 'Ventas & Pedidos', iconName: 'ShoppingBag', path: '/ventas' },
    { label: 'CRM & Atención', iconName: 'Users', path: '/crm' },
    { label: 'Marketing & Campañas', iconName: 'Megaphone', path: '/marketing' },
    { label: 'CDP & Audiencias', iconName: 'Target', path: '/cdp' },
    { label: 'Logística & Fulfillment', iconName: 'Truck', path: '/logistica' },
    { label: 'Finanzas & Contabilidad', iconName: 'Landmark', path: '/finanzas' },
    { label: 'Analytics & BI', iconName: 'AreaChart', path: '/analytics' },
    { label: 'Integraciones', iconName: 'Plug', path: '/integraciones' },
    { label: 'Configuración', iconName: 'Settings', path: '/configuracion' },
    { label: 'Ayuda & Soporte', iconName: 'HelpCircle', path: '/ayuda' },
];

export const Default: Story = {
  args: {
    navItems,
  },
};

export const Collapsed: Story = {
  args: {
    ...Default.args,
    collapsed: true,
  },
};

export const ActiveItem: Story = {
    args: {
      ...Default.args,
      activePath: '/productos',
    },
  };
