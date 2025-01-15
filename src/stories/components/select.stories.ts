import { Select } from "@/components/ui/select";
import type { Meta, StoryObj } from "@storybook/react";

// Configuração principal do Storybook
const meta: Meta<typeof Select> = {
  title: "Example/Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Valor selecionado no Select",
      defaultValue: "option1",
    },
    options: {
      description: "Lista de opções para o Select",
      defaultValue: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ],
    },
    onChange: {
      action: "changed",
      description: "Função chamada quando o valor selecionado muda",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "option1",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};

export const Custom: Story = {
  args: {
    value: "option2",
    options: [
      { value: "option1", label: "Custom Option 1" },
      { value: "option2", label: "Custom Option 2" },
      { value: "option3", label: "Custom Option 3" },
    ],
  },
};
