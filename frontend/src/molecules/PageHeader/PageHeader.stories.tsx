import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader, type PageHeaderProps } from './PageHeader';
import { Button } from '@/atoms/Button';

const meta: Meta<PageHeaderProps> = {
  title: 'Molecules/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    breadcrumbs: { control: 'object' },
    actions: { control: 'object' },
    icon: { control: 'text' },
    divider: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const baseCrumbs = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#' },
  { label: 'Item' },
];

export const Default: Story = {
  args: {
    title: 'Products',
    breadcrumbs: baseCrumbs,
    divider: true,
  },
};

export const WithActions: Story = {
  args: {
    title: 'Orders',
    breadcrumbs: [{ label: 'Home', href: '#' }, { label: 'Orders' }],
    actions: (
      <div className="flex gap-2 flex-wrap">
        <Button intent="secondary">Export</Button>
        <Button intent="secondary">New</Button>
      </div>
    ),
  },
};

export const MobileCollapse: Story = {
  args: {
    title: 'Mobile view',
    breadcrumbs: [{ label: 'Home', href: '#' }, { label: 'Mobile' }],
    actions: (
      <div className="flex gap-2 flex-wrap">
        <Button intent="secondary">Export</Button>
        <Button intent="secondary">Filter</Button>
        <Button intent="secondary">New</Button>
      </div>
    ),
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
