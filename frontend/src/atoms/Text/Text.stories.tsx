import type { Meta, StoryObj } from '@storybook/react';
import { Text, TextProps } from './Text';

const meta: Meta<TextProps> = {
  title: 'Atoms/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    weight: { control: 'select', options: ['normal', 'semibold', 'bold'] },
    color: {
      control: 'select',
      options: [undefined, 'primary', 'secondary', 'tertiary', 'quaternary', 'success'],
    },
    muted: { control: 'boolean' },
    as: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Text {...args} size="sm">Small text</Text>
      <Text {...args} size="md">Default text</Text>
      <Text {...args} size="lg">Large text</Text>
    </div>
  ),
  args: {},
};

export const Muted: Story = {
  args: { children: 'Secondary information', muted: true, size: 'sm' },
};

export const Colors: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Text {...args} color="primary">Primary</Text>
      <Text {...args} color="secondary">Secondary</Text>
      <Text {...args} color="tertiary">Tertiary</Text>
      <Text {...args} color="quaternary">Quaternary</Text>
      <Text {...args} color="success">Success</Text>
    </div>
  ),
  args: {},
};

export const Weights: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Text {...args} weight="normal">Normal weight</Text>
      <Text {...args} weight="semibold">Semibold weight</Text>
      <Text {...args} weight="bold">Bold weight</Text>
    </div>
  ),
  args: {},
};
