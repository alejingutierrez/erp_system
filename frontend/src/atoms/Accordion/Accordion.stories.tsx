import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionProps } from './Accordion';

const meta: Meta<AccordionProps> = {
  title: 'Atoms/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success'],
    },
    defaultOpen: { control: 'boolean' },
    open: { control: false },
    onToggle: { action: 'toggle' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Section title',
    children: 'Hidden content here',
  },
};

export const Open: Story = {
  args: {
    title: 'Initially open',
    defaultOpen: true,
    children: 'Content visible by default',
  },
};

export const Colors: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Accordion {...args} color="primary" title="Primary">
        Content primary
      </Accordion>
      <Accordion {...args} color="secondary" title="Secondary">
        Content secondary
      </Accordion>
      <Accordion {...args} color="tertiary" title="Tertiary">
        Content tertiary
      </Accordion>
      <Accordion {...args} color="quaternary" title="Quaternary">
        Content quaternary
      </Accordion>
      <Accordion {...args} color="success" title="Success">
        Content success
      </Accordion>
    </div>
  ),
  args: {
    defaultOpen: false,
    children: '...',
  },
};
