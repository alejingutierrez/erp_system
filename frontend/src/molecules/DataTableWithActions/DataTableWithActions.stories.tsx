import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DataTableWithActions, DataTableProps, Column } from './DataTableWithActions';

interface Row {
  id: number;
  name: string;
  stock: number;
}

const columns: Column<Row>[] = [
  { id: 'name', header: 'Producto', accessor: (r) => r.name, sortable: true },
  { id: 'stock', header: 'Stock', accessor: (r) => r.stock, sortable: true },
];

const data: Row[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  stock: Math.floor(Math.random() * 50),
}));

const meta: Meta<DataTableProps<Row>> = {
  title: 'Molecules/DataTableWithActions',
  component: DataTableWithActions,
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object' },
    pageSize: { control: 'number' },
    onEdit: { action: 'edit', table: { category: 'Events' } },
    onDelete: { action: 'delete', table: { category: 'Events' } },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Editable: Story = {
  args: {
    data,
    columns,
    pageSize: 5,
  },
  render: (args) => <DataTableWithActions<Row> {...args} />,
};

export const ReadOnly: Story = {
  args: {
    data,
    columns,
    pageSize: 5,
    onEdit: undefined,
    onDelete: undefined,
  },
  render: (args) => <DataTableWithActions<Row> {...args} />,
};

export const ManyRows: Story = {
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}`, stock: i })),
    columns,
    pageSize: 10,
  },
  render: (args) => <DataTableWithActions<Row> {...args} />,
};
