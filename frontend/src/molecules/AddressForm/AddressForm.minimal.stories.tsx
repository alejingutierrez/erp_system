import type { Meta, StoryObj } from '@storybook/react';

// Test if we can import the component at all
const TestComponent = () => {
  return <div>AddressForm Import Test - If you see this, the import works</div>;
};

const meta: Meta<typeof TestComponent> = {
  title: 'Test/AddressFormImportTest',
  component: TestComponent,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ImportTest: Story = {
  render: () => <TestComponent />,
};
