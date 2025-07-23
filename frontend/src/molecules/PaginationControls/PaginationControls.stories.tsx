import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PaginationControls, PaginationControlsProps } from './PaginationControls';

const meta: Meta<PaginationControlsProps> = {
  title: 'Molecules/PaginationControls',
  component: PaginationControls,
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    siblings: { control: 'number' },
    showFirstLast: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onPageChange: { action: 'page changed' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
  },
  render: (args) => {
    const [page, setPage] = useState(args.currentPage ?? 1);
    return (
      <PaginationControls
        {...args}
        currentPage={page}
        onPageChange={setPage}
      />
    );
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 5,
    totalPages: 8,
    siblings: 1,
    showFirstLast: true,
  },
  render: (args) => {
    const [page, setPage] = useState(args.currentPage ?? 1);
    return (
      <PaginationControls
        {...args}
        currentPage={page}
        onPageChange={setPage}
      />
    );
  },
};
