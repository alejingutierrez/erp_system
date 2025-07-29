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

const storeMenuItems = [
    { label: 'Tienda Principal' },
    { label: 'Tienda Secundaria' },
];

export const Default: Story = {
  args: {
    navItems: navItems,
    notificationsCount: 3,
    userName: 'Jane Doe',
    userMenuItems: [
      { label: 'Profile' },
      { label: 'Logout' },
    ],
    storeMenuItems,
    activeStore: 'Tienda Principal',
    children: 'Contenido principal de la aplicación'
  },
};

export const WithLevel2Panel: Story = {
    args: {
        ...Default.args,
        activePath: '/productos',
        level2Title: 'Productos & Catálogo',
        level2Actions: [
            { label: 'Crear', onClick: () => alert('Crear') },
            { label: 'Importar', onClick: () => alert('Importar') },
            { label: 'Exportar', onClick: () => alert('Exportar') },
        ],
        children: 'Aquí iría el contenido del panel de nivel 2, como una tabla de productos.'
    }
}
