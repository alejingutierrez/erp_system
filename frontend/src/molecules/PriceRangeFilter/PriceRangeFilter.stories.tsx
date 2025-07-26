import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PriceRangeFilter, PriceRangeFilterProps } from './PriceRangeFilter';

const meta: Meta<PriceRangeFilterProps> = {
  title: 'Molecules/PriceRangeFilter',
  component: PriceRangeFilter,
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    value: { control: 'object' },
    currency: { control: 'text' },
    onChange: { action: 'change', table: { category: 'Events' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultARS: Story = {
  args: {
    min: 0,
    max: 1000,
    step: 10,
    value: [200, 800],
    currency: 'ARS',
  },
};

export const USDStep5: Story = {
  args: {
    min: 0,
    max: 100,
    step: 5,
    value: [20, 80],
    currency: 'USD',
  },
};

export const InvalidRange: Story = {
  args: {
    min: 100,
    max: 50,
    value: [60, 40],
    currency: 'USD',
  },
};
