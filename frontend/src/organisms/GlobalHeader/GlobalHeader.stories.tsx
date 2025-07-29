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

const baseItems = [
  { label: 'Dashboard', iconName: 'Home', path: '/dashboard' },
  { label: 'Orders', iconName: 'Package', path: '/orders' },
  { label: 'Customers', iconName: 'Users', path: '/customers' },
];

const submenuItems = [
  {
    label: 'Reports',
    iconName: 'BarChart2',
    children: [
      { label: 'Sales', path: '/reports/sales' },
      { label: 'Inventory', path: '/reports/inventory' },
    ],
  },
];

export const Default: Story = {
  args: {
    logo: 'Fashion',
    title: 'ERP',
    navItems: baseItems,
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

export const WithNotifications: Story = {
  args: {
    ...Default.args,
    notificationsCount: 8,
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    color: 'primary',
    variant: 'glass',
  },
};

export const WithSubmenus: Story = {
  args: {
    ...Default.args,
    navItems: [...baseItems, ...submenuItems],
  },
};
