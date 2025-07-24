import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SearchBar, SearchBarProps } from './SearchBar';

const meta: Meta<SearchBarProps> = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', name: 'valor' },
    placeholder: { control: 'text' },
    showButton: { control: 'boolean' },
    debounce: { control: 'number' },
    onSearch: { action: 'search', table: { category: 'Events' } },
  },
  render: (args) => {
    const [term, setTerm] = React.useState(args.value ?? '');
    return (
      <SearchBar
        {...args}
        value={term}
        onSearch={(t) => {
          args.onSearch?.(t);
          setTerm(t);
        }}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Buscar...' },
};

export const WithButton: Story = {
  args: { placeholder: 'Buscar...', showButton: true },
};

export const Debounced: Story = {
  args: { placeholder: 'Buscar...', debounce: 500 },
};
