import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState, EmptyStateProps } from './EmptyState';
import { iconMap, type IconName } from '@/atoms/Icon';

interface EmptyStateStoryProps extends EmptyStateProps {
  iconName: IconName;
}

const iconOptions = Object.keys(iconMap) as IconName[];

const meta: Meta<EmptyStateStoryProps> = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    iconName: { control: 'select', options: iconOptions },
    title: { control: 'text' },
    message: { control: 'text' },
    actionLabel: { control: 'text' },
    hideIcon: { control: 'boolean' },
    onAction: { action: 'action clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconName: 'Folder',
    title: 'Sin resultados',
    message: 'Prueba ajustar los filtros',
    actionLabel: 'Crear',
  },
};

export const WithoutAction: Story = {
  args: {
    iconName: 'Folder',
    title: 'Nada que mostrar',
    message: 'Aún no hay elementos',
    actionLabel: '',
  },
};

export const TextOnly: Story = {
  args: {
    hideIcon: true,
    title: 'No se encontraron datos',
    message: 'Intenta nuevamente más tarde',
  },
};
