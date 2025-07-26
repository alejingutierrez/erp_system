import type { Meta, StoryObj } from '@storybook/react';
import { DashboardWidget, DashboardWidgetProps } from './DashboardWidget';
import { iconMap, type IconName } from '@/atoms/Icon';

interface WidgetStoryProps extends DashboardWidgetProps {
  iconName?: IconName;
}

const iconOptions = Object.keys(iconMap) as IconName[];

const meta: Meta<WidgetStoryProps> = {
  title: 'Molecules/DashboardWidget',
  component: DashboardWidget,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'danger'] },
    iconName: { control: 'select', options: iconOptions },
    title: { control: 'text' },
    value: { control: 'text' },
    subLabel: { control: 'text' },
    chart: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Pedidos',
    value: '120',
    subLabel: 'Última semana',
  },
};

export const WithChart: Story = {
  args: {
    title: 'Ventas',
    value: '$8k',
    subLabel: 'Últimos 7 días',
    chart: (
      <svg width="80" height="24" viewBox="0 0 80 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="0,20 10,10 20,14 30,6 40,12 50,4 60,16 70,8 80,10" />
      </svg>
    ),
  },
};

export const DangerVariant: Story = {
  args: {
    title: 'Errores',
    value: '5',
    variant: 'danger',
    iconName: 'AlertTriangle',
    subLabel: 'Hoy',
  },
};
