import type { Meta, StoryObj } from '@storybook/react';
import { Level2Panel } from './Level2Panel';

const meta: Meta<typeof Level2Panel> = {
  title: 'Organisms/Level2Panel',
  component: Level2Panel,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    actions: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Productos',
    actions: [
      { label: 'Crear', onClick: () => alert('Crear') },
      { label: 'Importar', onClick: () => alert('Importar') },
      { label: 'Exportar', onClick: () => alert('Exportar') },
    ],
    children: 'Contenido del panel de nivel 2',
  },
};

export const WithoutActions: Story = {
  args: {
    title: 'Visión general',
    children: 'Contenido del panel de nivel 2 sin acciones',
  },
};
