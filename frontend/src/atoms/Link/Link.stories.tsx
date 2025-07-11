import type { Meta, StoryObj } from '@storybook/react';
import { Link, LinkProps } from './Link';

const meta: Meta<LinkProps> = {
  title: 'Atoms/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary', 'success'],
    },
    isExternal: { control: 'boolean' },
    href: { control: 'text' },
    target: { table: { disable: true } },
    rel: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { href: '#', children: 'Default Link' },
};

export const Colors: Story = {
  render: (args) => (
    <div className="space-x-2">
      <Link {...args} color="primary">Primary</Link>
      <Link {...args} color="secondary">Secondary</Link>
      <Link {...args} color="tertiary">Tertiary</Link>
      <Link {...args} color="quaternary">Quaternary</Link>
      <Link {...args} color="success">Success</Link>
    </div>
  ),
  args: { href: '#' },
};


export const External: Story = {
  args: {
    href: 'https://example.com',
    isExternal: true,
    children: 'External link',
  },
};
