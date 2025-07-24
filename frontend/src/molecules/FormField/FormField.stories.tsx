import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FormField, FormFieldProps } from './FormField';
import { Input } from '@/atoms/Input';
import { Textarea } from '@/atoms/Textarea';

const meta: Meta<FormFieldProps> = {
  title: 'Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    label: { control: 'text' },
    required: { control: 'boolean' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    children: { table: { disable: true } },
  },
  render: (args) => <FormField {...args}>{args.children ?? <Input />}</FormField>,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'name',
    label: 'Name',
    helperText: 'Enter your name',
  },
};

export const WithError: Story = {
  args: {
    id: 'email',
    label: 'Email',
    error: 'Required field',
  },
};

export const Required: Story = {
  args: {
    id: 'username',
    label: 'Username',
    required: true,
  },
};

export const WithTextarea: Story = {
  args: {
    id: 'about',
    label: 'About you',
    helperText: 'Tell us about yourself',
    children: <Textarea />,
  },
};
