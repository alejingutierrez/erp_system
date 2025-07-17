import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tag, TagProps } from './Tag';

const meta: Meta<TagProps> = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['outline', 'solid'] },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success', 'destructive'],
    },
    closable: { control: 'boolean' },
    removeLabel: { control: 'text' },
    children: { control: 'text' },
    onRemove: { action: 'removed', table: { category: 'Events' } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Etiqueta' },
};

export const Solid: Story = {
  args: { variant: 'solid', color: 'secondary', children: 'VIP' },
};

export const Closable: Story = {
  render: (args) => {
    const [visible, setVisible] = React.useState(true);
    if (!visible) return null;
    return <Tag {...args} onRemove={() => setVisible(false)} />;
  },
  args: { closable: true, children: 'Filtro: Azul' },
};
