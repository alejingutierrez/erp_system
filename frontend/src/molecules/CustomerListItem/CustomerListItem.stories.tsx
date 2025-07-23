import type { Meta, StoryObj } from "@storybook/react";
import { CustomerListItem, CustomerListItemProps } from "./CustomerListItem";

const meta: Meta<CustomerListItemProps> = {
  title: "Molecules/CustomerListItem",
  component: CustomerListItem,
  tags: ["autodocs"],
  argTypes: {
    customerName: { control: "text" },
    email: { control: "text" },
    phone: { control: "text" },
    purchasesCount: { control: "number" },
    category: { control: "text" },
    active: { control: "boolean" },
    showActions: { control: "boolean" },
    actionMenuOptions: { control: "object" },
    onMenuOptionSelect: { action: "option select" },
    onClick: { action: "click" },
    onEdit: { action: "edit" },
    onContact: { action: "contact" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    customerName: "Juan Perez",
    email: "juan@correo.com",
    purchasesCount: 5,
    category: "VIP",
    active: true,
    showActions: true,
    actionMenuOptions: [
      { label: "Editar", iconName: "Edit" },
      { label: "Contactar", iconName: "Mail" },
    ],
  },
};

export const Inactive: Story = {
  args: {
    customerName: "Ana Gómez",
    email: "ana@example.com",
    active: false,
  },
};

export const WithMenu: Story = {
  args: {
    customerName: "Carlos",
    email: "carlos@example.com",
    showActions: true,
    actionMenuOptions: [
      { label: "Editar", iconName: "Edit" },
      { label: "Contactar", iconName: "Mail" },
    ],
  },
};
