import type { Meta, StoryObj } from '@storybook/react';
import { FilterTagList, FilterTagListProps } from './FilterTagList';
import { iconMap, type IconName } from '@/atoms/Icon';

interface FilterTagListStoryProps extends FilterTagListProps {
  icon?: IconName;
}

const iconOptions = Object.keys(iconMap) as IconName[];

const meta: Meta<FilterTagListStoryProps> = {
  title: 'Molecules/FilterTagList',
  component: FilterTagList,
  tags: ['autodocs'],
  argTypes: {
    filters: { control: 'object' },
    showClearAll: { control: 'boolean' },
    tagVariant: { control: 'select', options: ['outline', 'solid'] },
    tagColor: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'quaternary',
        'success',
        'destructive',
      ],
    },
    icon: { control: 'select', options: [undefined, ...iconOptions] },
    onRemove: { action: 'removed', table: { category: 'Events' } },
    onClearAll: { action: 'cleared', table: { category: 'Events' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filters: ['Categoría: Camisas', 'Talla: M', 'Marca: ACME'],
    showClearAll: true,
    tagVariant: 'outline',
  },
};

export const WithIcon: Story = {
  args: {
    filters: ['Color: Azul', 'Talla: L'],
    showClearAll: true,
    icon: 'Filter',
  },
};

export const Solid: Story = {
  args: {
    filters: ['Categoria: Pantalones', 'Marca: XYZ'],
    tagVariant: 'solid',
    tagColor: 'secondary',
  },
};
