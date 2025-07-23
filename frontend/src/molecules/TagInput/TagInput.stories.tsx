import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TagInput, TagInputProps } from './TagInput';

const meta: Meta<TagInputProps> = {
  title: 'Molecules/TagInput',
  component: TagInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Las etiquetas ahora cuentan con un pequeño espacio entre ellas para mejorar la lectura.',
      },
    },
  },
  argTypes: {
    tags: { control: 'object' },
    placeholder: { control: 'text' },
    maxTags: { control: 'number' },
    separators: { control: 'text' },
    tagColor: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success', 'destructive'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success', 'destructive'],
    },
    disabled: { control: 'boolean' },
    onTagAdd: { action: 'tag added', table: { category: 'Events' } },
    onTagRemove: { action: 'tag removed', table: { category: 'Events' } },
    onChange: { action: 'changed', table: { category: 'Events' } },
    onInput: { action: 'input', table: { category: 'Events' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Agregar etiquetas...' },
};

export const WithInitialTags: Story = {
  args: {
    tags: ['react', 'design'],
    placeholder: 'Agregar etiquetas...',
  },
};

export const Disabled: Story = {
  args: {
    tags: ['no-editable'],
    disabled: true,
  },
};

export const Limited: Story = {
  args: {
    maxTags: 3,
    placeholder: 'Máximo 3',
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [tags, setTags] = React.useState<string[]>(args.tags ?? []);
    return <TagInput {...args} tags={tags} onChange={setTags} />;
  },
  args: {
    placeholder: 'Controlado',
  },
};
