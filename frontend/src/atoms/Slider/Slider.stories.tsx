import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { Slider, SliderProps } from './Slider';

const meta: Meta<SliderProps> = {
  title: 'Atoms/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success'] },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    value: { control: 'number' },
    disabled: { control: 'boolean' },
    onChange: { action: 'change', table: { category: 'Events' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [val, setVal] = useState(50);
    return (
      <Slider
        {...args}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
      />
    );
  },
}; 

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Slider {...args} size="sm" />
      <Slider {...args} size="md" />
      <Slider {...args} size="lg" />
    </div>
  ),
  args: { value: 40 },
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Slider {...args} color="primary" />
      <Slider {...args} color="secondary" />
      <Slider {...args} color="tertiary" />
      <Slider {...args} color="quaternary" />
      <Slider {...args} color="success" />
    </div>
  ),
  args: { value: 30 },
};

export const Disabled: Story = {
  args: { value: 60, disabled: true },
};

export const WithIndicator: Story = {
  render: (args) => {
    const [val, setVal] = useState(30);
    return (
      <Slider
        {...args}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
      />
    );
  },
  args: {},
};
