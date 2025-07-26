import type { Meta, StoryObj } from '@storybook/react';
import { SidebarMenu, SidebarMenuProps, NavLink } from './SidebarMenu';

const items: NavLink[] = [
  { label: 'Inicio', icon: 'Home', path: '/' },
  {
    label: 'Proyectos',
    icon: 'Folder',
    children: [
      { label: 'Activos', path: '/proyectos/activos' },
      { label: 'Archivados', path: '/proyectos/archivados' },
    ],
  },
  { label: 'Reportes', icon: 'BarChart2', path: '/reportes' },
];

const meta: Meta<SidebarMenuProps> = {
  title: 'Molecules/SidebarMenu',
  component: SidebarMenu,
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean' },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'tertiary', 'quaternary', 'altPrimary'],
    },
    onNavigate: { action: 'navigate', table: { category: 'Events' } },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items },
};

export const Collapsed: Story = {
  args: { items, collapsed: true },
};

export const WithNested: Story = {
  args: { items },
};
