import type { Meta, StoryObj } from "@storybook/react";
import { Textarea, TextareaProps } from "./Textarea";

const meta: Meta<TextareaProps> = {
  title: "Atoms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "ghost"] },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "quaternary",
        "success",
        "destructive",
      ],
    },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    placeholder: { control: "text" },
    label: { control: "text" },
    showCharCount: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { placeholder: "Enter text" } };
export const WithError: Story = {
  args: { placeholder: "Invalid", error: true },
};
export const Disabled: Story = {
  args: { placeholder: "Disabled", disabled: true },
};
export const Small: Story = { args: { size: "sm", placeholder: "Small" } };
export const Large: Story = { args: { size: "lg", placeholder: "Large" } };
export const WithLabel: Story = {
  args: { label: "Description", color: "secondary" },
};
export const WithCounter: Story = {
  args: { label: "Notes", showCharCount: true, maxLength: 100, color: "tertiary" },
};
export const Ghost: Story = {
  args: { placeholder: "Ghost variant", variant: "ghost" },
};
