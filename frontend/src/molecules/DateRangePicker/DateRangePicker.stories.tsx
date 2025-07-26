import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateRangePicker, type DateRangePickerProps } from './DateRangePicker';

const meta: Meta<DateRangePickerProps> = {
  title: 'Molecules/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  argTypes: {
    disabledPast: { control: 'boolean' },
    onChange: { action: 'change', table: { category: 'Events' } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
      start: null,
      end: null,
    });
    return (
      <DateRangePicker
        {...args}
        value={range}
        onChange={(r) => setRange(r)}
      />
    );
  },
};

export const DisabledPast: Story = {
  args: { disabledPast: true },
  render: (args) => {
    const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
      start: null,
      end: null,
    });
    return (
      <DateRangePicker
        {...args}
        value={range}
        onChange={(r) => setRange(r)}
      />
    );
  },
};
