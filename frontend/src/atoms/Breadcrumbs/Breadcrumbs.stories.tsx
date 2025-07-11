import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumbs, { BreadcrumbsProps } from './Breadcrumbs';

const exampleItems = [
  { label: 'Inicio', href: '#' },
  { label: 'Inventario', href: '#' },
  { label: 'Productos', href: '#' },
  { label: 'Camisa X' },
];

const meta: Meta<BreadcrumbsProps> = {
  title: 'Atoms/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success'],
    },
    separator: { control: 'text' },
    className: { table: { disable: true } },
    items: { table: { disable: true } },
  },
  args: {
    items: exampleItems,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColor: Story = {
  args: { color: 'primary' },
};

export const CustomSeparator: Story = {
  args: { separator: '>' },
};

export const TwoItems: Story = {
  args: {
    items: [
      { label: 'Inicio', href: '#' },
      { label: 'Perfil' },
    ],
  },
};
