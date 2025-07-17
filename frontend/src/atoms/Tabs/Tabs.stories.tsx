import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tabs, TabsProps } from './Tabs';

const exampleItems = [
  { label: 'Perfil', content: <p>Contenido del perfil</p> },
  { label: 'Actividad', content: <p>Historial del usuario</p> },
  { label: 'Ajustes', content: <p>Configuraci\u00f3n de la cuenta</p> },
];

const meta: Meta<TabsProps> = {
  title: 'Atoms/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['underline', 'solid', 'accordion'] },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success'],
    },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    defaultIndex: { control: 'number' },
  },
  args: { items: exampleItems },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Solid: Story = {
  args: { variant: 'solid', color: 'secondary' },
};

export const Vertical: Story = {
  args: { orientation: 'vertical', defaultIndex: 1 },
};

export const AccordionVariant: Story = {
  args: { variant: 'accordion', orientation: 'vertical' },
};
