import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { Radio, type RadioProps } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    intent: { control: { type: 'select' }, options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success'] },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    name: { control: 'text' },
    allowDeselect: { control: 'boolean' },
    onChange: { action: 'changed', table: { category: 'Events' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: StoryFn<RadioProps> = (args) => {
  const [checked, setChecked] = useState(
    args.defaultChecked ?? args.checked ?? false,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    args.onChange?.(e);
  };

  return <Radio {...args} checked={checked} onChange={handleChange} />;
};

export const Default: Story = {
  render: Template,
  args: {
    name: 'choice',
    label: 'Option',
    size: 'md',
    intent: 'primary',
    allowDeselect: true,
  },
};

export const Selected: Story = {
  render: Template,
  args: {
    name: 'choice',
    label: 'Selected',
    size: 'md',
    intent: 'primary',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    name: 'choice',
    label: 'Disabled',
    size: 'md',
    intent: 'primary',
    disabled: true,
  },
};

export const Large: Story = {
  render: Template,
  args: {
    name: 'choice',
    label: 'Large',
    size: 'lg',
    intent: 'primary',
  },
};

export const Small: Story = {
  render: Template,
  args: {
    name: 'choice',
    label: 'Small',
    size: 'sm',
    intent: 'primary',
  },
};


export const GroupExample: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('2');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(e.target.value);
    };

    return (
      <div className="flex flex-col gap-2">
        <Radio
          name="group1"
          value="1"
          label="First"
          size="md"
          intent="primary"
          checked={selectedValue === '1'}
          onChange={handleChange}
        />
        <Radio
          name="group1"
          value="2"
          label="Second"
          size="md"
          intent="primary"
          checked={selectedValue === '2'}
          onChange={handleChange}
        />
        <Radio
          name="group1"
          value="3"
          label="Third"
          size="md"
          intent="primary"
          checked={selectedValue === '3'}
          onChange={handleChange}
        />
      </div>
    );
  },
};
