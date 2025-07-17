import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Switch, SwitchProps } from './Switch';

const meta: Meta<SwitchProps> = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success'],
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onCheckedChange: { action: 'changed', table: { category: 'Events' } },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [val, setVal] = useState(args.checked ?? false);
    return <Switch {...args} checked={val} onCheckedChange={setVal} />;
  },
  args: {
    checked: false,
    size: 'md',
    intent: 'primary',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center space-x-4">
      <Switch {...args} size="sm" />
      <Switch {...args} size="md" />
      <Switch {...args} size="lg" />
    </div>
  ),
  args: { checked: true },
};

export const Intents: Story = {
  render: (args) => (
    <div className="flex items-center space-x-4">
      <Switch {...args} intent="primary" />
      <Switch {...args} intent="secondary" />
      <Switch {...args} intent="tertiary" />
      <Switch {...args} intent="quaternary" />
      <Switch {...args} intent="success" />
    </div>
  ),
  args: { checked: true },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true },
};

export const WithLabel: Story = {
  render: (args) => {
    const [val, setVal] = useState(args.checked ?? false);
    return (
      <div className="flex items-center space-x-2">
        <label htmlFor="mode" className="font-medium text-gray-700">
          Night Mode
        </label>
        <Switch
          {...args}
          id="mode"
          checked={val}
          onCheckedChange={setVal}
        />
      </div>
    );
  },
  args: { checked: true },
};
