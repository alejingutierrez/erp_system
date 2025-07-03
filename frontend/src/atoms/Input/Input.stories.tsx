import type { Meta, StoryObj } from "@storybook/react";
import { Input, InputProps } from "./Input";
import { iconMap, IconName } from "./icons";

interface InputStoryProps extends InputProps {
  leftIconName?: IconName;
  rightIconName?: IconName;
  rightButtonName?: IconName;
}

const iconOptions = Object.keys(iconMap) as IconName[];

const meta: Meta<InputStoryProps> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    placeholder: { control: "text" },
    label: { control: "text" },
    showCharCount: { control: "boolean" },
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
    leftIconName: {
      name: "Left Icon",
      control: "select",
      options: [undefined, ...iconOptions],
    },
    rightIconName: {
      name: "Right Icon",
      control: "select",
      options: [undefined, ...iconOptions],
    },
    rightButtonName: {
      name: "Right Button",
      control: "select",
      options: [undefined, ...iconOptions],
    },
    LeftIcon: { table: { disable: true } },
    RightIcon: { table: { disable: true } },
    RightButton: { table: { disable: true } },
  },
  render: ({ leftIconName, rightIconName, rightButtonName, ...args }) => {
    const LeftIcon = leftIconName ? iconMap[leftIconName] : undefined;
    const RightIcon = rightIconName ? iconMap[rightIconName] : undefined;
    const RightButton = rightButtonName ? iconMap[rightButtonName] : undefined;
    return (
      <Input
        {...args}
        LeftIcon={LeftIcon}
        RightIcon={RightIcon}
        RightButton={RightButton}
      />
    );
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
export const Small: Story = { args: { size: "sm", placeholder: "Small size" } };
export const Large: Story = { args: { size: "lg", placeholder: "Large size" } };
export const WithLabel: Story = {
  args: { label: "Email", color: "secondary" },
};
export const WithCounter: Story = {
  args: { label: "Bio", showCharCount: true, maxLength: 50, color: "tertiary" },
};

export const SearchBar: Story = {
  args: {
    placeholder: "Buscar...",
    leftIconName: "Search",
    color: "primary",
  },
};

export const WithUploadButton: Story = {
  args: {
    placeholder: "Subir documento",
    rightButtonName: "Upload",
    color: "secondary",
  },
};

export const WithRecordButton: Story = {
  args: {
    placeholder: "Grabar audio",
    rightButtonName: "Mic",
    color: "secondary",
  },
};
