import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';

import { Switch, SwitchProps } from './Switch';

export default {
  title: 'Atoms/Switch',
  component: Switch,
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked.',
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Callback when the switch is toggled.',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the switch.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled.',
    },
  },
} as Meta;

const Template: StoryFn<SwitchProps> = (args) => {
  const [checked, setChecked] = useState(args.checked);

  React.useEffect(() => {
    setChecked(args.checked);
  }, [args.checked]);

  const handleCheckedChange = (isChecked: boolean) => {
    setChecked(isChecked);
    args.onCheckedChange(isChecked);
  };

  return <Switch {...args} checked={checked} onCheckedChange={handleCheckedChange} />;
};

export const Default = Template.bind({});
Default.args = {
  checked: false,
  size: 'md',
  disabled: false,
};

export const Sizes: StoryFn<SwitchProps> = (args) => (
  <div className="flex items-center space-x-4">
    <Switch {...args} size="sm" />
    <Switch {...args} size="md" />
    <Switch {...args} size="lg" />
  </div>
);
Sizes.args = {
  checked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  checked: false,
  disabled: true,
};

export const WithLabel: StoryFn<SwitchProps> = (args) => {
  const [checked, setChecked] = useState(args.checked);

  const handleCheckedChange = (isChecked: boolean) => {
    setChecked(isChecked);
    args.onCheckedChange(isChecked);
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="night-mode" className="font-medium text-gray-700">
        Night Mode
      </label>
      <Switch
        {...args}
        id="night-mode"
        checked={checked}
        onCheckedChange={handleCheckedChange}
      />
    </div>
  );
};
WithLabel.args = {
  checked: true,
  size: 'md',
  disabled: false,
};
