import type { Meta, StoryObj } from '@storybook/react';
import { ProductListItem, ProductListItemProps } from './ProductListItem';

const meta: Meta<ProductListItemProps> = {
  title: 'Molecules/ProductListItem',
  component: ProductListItem,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    img: { control: 'text' },
    name: { control: 'text' },
    price: { control: 'number' },
    currency: { control: 'text' },
    showActions: { control: 'boolean' },
    onAdd: { action: 'add', table: { category: 'Events' } },
    onEdit: { action: 'edit', table: { category: 'Events' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    img: 'https://placehold.co/40',
    name: 'Camiseta básica',
    price: 19.99,
  },
};

export const LongName: Story = {
  args: {
    id: '2',
    img: 'https://placehold.co/40',
    name: 'Producto con un nombre extremadamente largo que se trunca',
    price: 29.99,
  },
};

export const WithoutActions: Story = {
  args: {
    id: '3',
    img: 'https://placehold.co/40',
    name: 'Sin acciones',
    price: 9.99,
    showActions: false,
  },
};
