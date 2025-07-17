import type { Meta, StoryObj } from '@storybook/react';
import { Heading, HeadingProps } from './Heading';

const meta: Meta<HeadingProps> = {
  title: 'Atoms/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    level: { control: 'number', options: [1, 2, 3, 4, 5, 6] },
    align: { control: 'select', options: ['left', 'center', 'right'] },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success'],
    },
    as: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { level: 1, children: 'Heading 1' },
};

export const Levels: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Heading {...args} level={1}>Heading 1 (600)</Heading>
      <Heading {...args} level={2}>Heading 2 (500)</Heading>
      <Heading {...args} level={3}>Heading 3 (400)</Heading>
      <Heading {...args} level={4}>Heading 4 (300)</Heading>
      <Heading {...args} level={5}>Heading 5 (200)</Heading>
      <Heading {...args} level={6}>Heading 6 (100)</Heading>
    </div>
  ),
  args: {},
};

export const Center: Story = {
  args: { level: 2, align: 'center', children: 'Centered Heading' },
};

export const Colors: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Heading {...args} color="primary">Primary</Heading>
      <Heading {...args} color="secondary">Secondary</Heading>
      <Heading {...args} color="tertiary">Tertiary</Heading>
      <Heading {...args} color="quaternary">Quaternary</Heading>
      <Heading {...args} color="success">Success</Heading>
    </div>
  ),
  args: { level: 3 },
};
