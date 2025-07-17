import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableProps, Column } from './Table';

const meta: Meta<TableProps> = {
  title: 'Atoms/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['simple', 'striped'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: {
      control: 'select',
      options: ['muted', 'primary', 'secondary', 'tertiary', 'quaternary', 'success'],
    },
    caption: { control: 'text' },
    hoverable: { control: 'boolean' },
    responsive: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const columns: Column[] = [
  { key: 'producto', header: 'Producto', sortable: true },
  { key: 'stock', header: 'Stock', sortable: true },
  { key: 'precio', header: 'Precio', sortable: true },
];

const data = [
  { producto: 'Camiseta', stock: 25, precio: 12 },
  { producto: 'Pantalón', stock: 10, precio: 25 },
  { producto: 'Zapatos', stock: 5, precio: 50 },
];

export const Default: Story = {
  args: {
    caption: 'Example inventory table',
    columns,
    data,
    hoverable: true,
  },
};

export const Striped: Story = {
  args: {
    variant: 'striped',
    columns: [
      { key: 'cliente', header: 'Cliente' },
      { key: 'correo', header: 'Correo' },
    ],
    data: [
      { cliente: 'Ana', correo: 'ana@example.com' },
      { cliente: 'Juan', correo: 'juan@example.com' },
    ],
    hoverable: true,
  },
};

export const Sortable: Story = {
  args: {
    columns,
    data,
    hoverable: true,
  },
};

export const Responsive: Story = {
  args: {
    responsive: true,
    columns: [
      { key: 'a', header: 'Column A' },
      { key: 'b', header: 'Column B' },
      { key: 'c', header: 'Column C' },
      { key: 'd', header: 'Column D' },
      { key: 'e', header: 'Column E' },
    ],
    data: [
      { a: 1, b: 2, c: 3, d: 4, e: 5 },
      { a: 6, b: 7, c: 8, d: 9, e: 10 },
    ],
  },
};
