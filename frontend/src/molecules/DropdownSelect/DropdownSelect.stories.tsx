import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DropdownSelect, DropdownSelectProps } from './DropdownSelect';

interface DropdownSelectStoryProps extends DropdownSelectProps {
  options: string[];
  selected?: string | string[];
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

const Template = (args: DropdownSelectStoryProps) => {
  const [value, setValue] = React.useState<string | string[] | undefined>(
    args.selected,
  );
  return (
    <DropdownSelect
      {...args}
      selected={value}
      onChange={(val) => {
        setValue(val);
        args.onChange?.(val);
      }}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    options: ['S', 'M', 'L', 'XL'],
    placeholder: 'Seleccione una talla',
  },
};

export const WithSearch: Story = {
  render: Template,
  args: {
    options: ['Camisas', 'Pantalones', 'Zapatos', 'Accesorios'],
    searchable: true,
    placeholder: 'Categoría',
  },
};

export const Multiple: Story = {
  render: Template,
  args: {
    options: ['Rojo', 'Azul', 'Verde', 'Negro'],
    multiple: true,
    searchable: true,
    placeholder: 'Colores',
  },
};
