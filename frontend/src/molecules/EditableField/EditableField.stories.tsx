import type { Meta, StoryObj } from '@storybook/react';
import { EditableField, EditableFieldProps } from './EditableField';

const meta: Meta<EditableFieldProps> = {
  title: 'Molecules/EditableField',
  component: EditableField,
  tags: ['autodocs'],
  argTypes: {
    initialValue: { control: 'text', name: 'valorInicial' },
    editable: { control: 'boolean' },
    placeholder: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], name: 'tamaño' },
    headingLevel: { control: 'number', options: [undefined,1,2,3,4,5,6], name: 'headingLevel' },
    onSave: { action: 'save' },
    onCancel: { action: 'cancel' },
    onEditStart: { action: 'editStart' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValue: 'Nombre de producto',
    placeholder: 'Escriba aquí...',
  },
};

export const Editing: Story = {
  args: {
    initialValue: 'Nombre de producto',
    editable: true,
  },
};
