import type { Meta, StoryObj } from '@storybook/react';
import { DropdownSelect, DropdownSelectProps } from './DropdownSelect';

interface DropdownSelectStoryProps extends DropdownSelectProps {
  options: string[];
  selected?: string;
}

const meta: Meta<DropdownSelectStoryProps> = {
  title: 'Molecules/DropdownSelect',
  component: DropdownSelect,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    selected: { control: 'text' },
    placeholder: { control: 'text' },
    searchable: { control: 'boolean', name: 'buscador' },
    multiple: { control: 'boolean' },
    onChange: { action: 'changed' },
    onOpen: { action: 'dropdownOpened' },
    onClose: { action: 'dropdownClosed' },
    onSearch: { action: 'search' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ['S', 'M', 'L', 'XL'],
    placeholder: 'Seleccione una talla',
  },
};

export const WithSearch: Story = {
  args: {
    options: ['Camisas', 'Pantalones', 'Zapatos', 'Accesorios'],
    searchable: true,
    placeholder: 'Categoría',
  },
};

export const Multiple: Story = {
  args: {
    options: ['Rojo', 'Azul', 'Verde', 'Negro'],
    multiple: true,
    searchable: true,
    placeholder: 'Colores',
  },
};
