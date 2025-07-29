import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { AddressForm } from './AddressForm';

const countries = [
  { label: 'United States', value: 'US', postalPattern: '^\\d{5}(-\\d{4})?$' },
  { label: 'Spain', value: 'ES', postalPattern: '^\\d{5}$' },
];

const meta: Meta<typeof AddressForm> = {
  title: 'Molecules/AddressForm',
  component: AddressForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: any) => {
  const [addr, setAddr] = React.useState({});
  return (
    <AddressForm
      {...args}
      value={addr}
      onChange={(val) => {
        setAddr({ ...addr, ...val });
        args.onChange?.(val);
      }}
    />
  );
};

export const WithPhone: Story = {
  render: Template,
  args: {
    value: {
      line1: '123 Main St',
      line2: 'Apt 4B',
      city: 'Madrid',
      state: 'Madrid',
      country: 'ES',
      postalCode: '28013',
      phone: '+34 123 456 789',
    },
    countries,
    showPhone: true,
    onChange: () => {},
  },
};

export const Basic: Story = {
  render: Template,
  args: {
    value: {
      line1: '456 Oak Ave',
      line2: '',
      city: 'New York',
      state: 'NY',
      country: 'US',
      postalCode: '10001',
    },
    countries,
    showPhone: false,
    onChange: () => {},
  },
};
