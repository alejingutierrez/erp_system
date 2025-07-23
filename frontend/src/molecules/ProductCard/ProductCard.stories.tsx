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
    imageSrc: undefined,
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

interface GridStoryProps extends ProductCardProps {
  numCards: number;
}

export const Grid: StoryObj<GridStoryProps> = {
  args: { numCards: 4, productName: 'Producto', price: '$19.99' },
  argTypes: {
    numCards: { control: { type: 'number', min: 1, step: 1 } },
  },
  render: ({ numCards, ...args }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-3xl">
      {Array.from({ length: numCards }).map((_, i) => (
        <ProductCard key={i} {...args} productName={`${args.productName} ${i + 1}`} />
      ))}
    </div>
  ),
};
