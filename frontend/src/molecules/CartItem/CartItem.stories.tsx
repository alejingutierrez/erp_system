import type { Meta, StoryObj } from '@storybook/react';
import { CartItem, CartItemProps } from './CartItem';

const meta: Meta<CartItemProps> = {
  title: 'Molecules/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  argTypes: {
    img: { control: 'text' },
    name: { control: 'text' },
    price: { control: 'number' },
    quantity: { control: 'number' },
    currency: { control: 'text' },
    stock: { control: 'number' },
    onQtyChange: { action: 'qtyChange' },
    onRemove: { action: 'remove' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    img: 'https://picsum.photos/seed/cart/100/100',
    name: 'Producto',
    price: 19.99,
    quantity: 1,
    currency: '$',
    stock: 5,
  },
};

export const NoImage: Story = {
  args: {
    ...Default.args,
    img: undefined,
  },
};
