import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AddressForm, AddressFormProps, Address } from './AddressForm';

const countries = [
  { label: 'España', value: 'ES', postalPattern: '^\\d{5}$', postalMask: '28013' },
  { label: 'Estados Unidos', value: 'US', postalPattern: '^\\d{5}(?:-\\d{4})?$', postalMask: '90210' },
];

const meta: Meta<AddressFormProps> = {
  title: 'Molecules/AddressForm',
  component: AddressForm,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    value: { table: { disable: true } },
    countries: { control: 'object' },
    showPhone: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: AddressFormProps) => {
  const [addr, setAddr] = React.useState<Address>(args.value);
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
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: 'ES',
      postalCode: '',
      phone: '',
    },
    countries,
    showPhone: true,
  },
};

export const Basic: Story = {
  render: Template,
  args: {
    value: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: 'US',
      postalCode: '',
    },
    countries,
    showPhone: false,
  },
};
