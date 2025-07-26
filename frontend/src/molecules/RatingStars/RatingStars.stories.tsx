import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RatingStars, RatingStarsProps } from './RatingStars';

const meta: Meta<RatingStarsProps> = {
  title: 'Molecules/RatingStars',
  component: RatingStars,
  tags: ['autodocs'],
  argTypes: {
    max: { control: 'number' },
    value: { control: 'number' },
    readOnly: { control: 'boolean' },
    size: { control: 'number' },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success', 'destructive'],
    },
    onChange: { action: 'changed', table: { category: 'Events' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [val, setVal] = React.useState(args.value ?? 0);
    return <RatingStars {...args} value={val} onChange={setVal} />;
  },
  args: { value: 3 },
};

export const ReadOnly: Story = {
  args: { value: 4, readOnly: true },
};

export const TenStars: Story = {
  render: (args) => {
    const [val, setVal] = React.useState(args.value ?? 0);
    return <RatingStars {...args} value={val} onChange={setVal} />;
  },
  args: { max: 10, value: 7 },
};
