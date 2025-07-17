import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard, ProductCardProps } from './ProductCard';

const meta: Meta<ProductCardProps> = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  argTypes: {
    productName: { control: 'text' },
    price: { control: 'text' },
    imageSrc: { control: 'text' },
    outOfStock: { control: 'boolean' },
    onSale: { control: 'boolean' },
    clickable: { control: 'boolean' },
    statusBadge: {
      control: 'select',
      options: [null, 'Nuevo', 'Oferta', 'Agotado'],
    },
    showActions: { control: 'boolean' },
    onAddToCart: { action: 'addToCart', table: { category: 'Events' } },
    onEdit: { action: 'editClicked', table: { category: 'Events' } },
    onDelete: { action: 'deleteClicked', table: { category: 'Events' } },
    onClick: { action: 'clicked', table: { category: 'Events' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    productName: 'Camisa de Lino',
    price: '$49.99',
    imageSrc: 'https://via.placeholder.com/300x200',
    outOfStock: false,
    onSale: false,
    clickable: true,
    statusBadge: null,
    showActions: false,
  },
};

export const WithBadges: Story = {
  args: {
    productName: 'Camisa de Lino',
    price: '$39.99',
    onSale: true,
    statusBadge: 'Nuevo',
  },
};

export const OutOfStock: Story = {
  args: {
    productName: 'Camisa de Lino',
    price: '$49.99',
    outOfStock: true,
    statusBadge: 'Agotado',
  },
};

export const WithActions: Story = {
  args: {
    productName: 'Camisa de Lino',
    price: '$49.99',
    showActions: true,
  },
};
