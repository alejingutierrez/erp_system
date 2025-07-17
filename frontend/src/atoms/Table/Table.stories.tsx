import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableProps } from './Table';

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
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    caption: 'Example inventory table',
    children: (
      <>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Stock</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Camiseta</td>
            <td>25</td>
            <td>$12</td>
          </tr>
          <tr>
            <td>Pantalón</td>
            <td>10</td>
            <td>$25</td>
          </tr>
        </tbody>
      </>
    ),
  },
};

export const Striped: Story = {
  args: {
    variant: 'striped',
    children: (
      <>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ana</td>
            <td>ana@example.com</td>
          </tr>
          <tr>
            <td>Juan</td>
            <td>juan@example.com</td>
          </tr>
        </tbody>
      </>
    ),
  },
};
