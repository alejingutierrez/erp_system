import type { Meta, StoryObj } from '@storybook/react';
import { StepIndicator, StepIndicatorProps } from './StepIndicator';

const meta: Meta<StepIndicatorProps> = {
  title: 'Molecules/StepIndicator',
  component: StepIndicator,
  tags: ['autodocs'],
  argTypes: {
    totalSteps: { control: { type: 'number', min: 1 } },
    currentStep: { control: { type: 'number', min: 1 } },
    labels: { control: 'object' },
    clickable: { control: 'boolean' },
    onStepClick: { action: 'stepClicked' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalSteps: 4,
    currentStep: 2,
    labels: ['Detalles', 'Imágenes', 'Precios', 'Confirmación'],
    clickable: true,
  },
};
