import { Input } from "@/components/ui/input";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Input> = {
  title: "Example/Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description:
        "Define o texto do rótulo que aparece acima do campo de entrada",
      defaultValue: "Label",
    },
    error: {
      control: "text",
      description:
        "Define a mensagem de erro que aparece abaixo do campo de entrada",
      defaultValue: "",
    },
    placeholder: {
      control: "text",
      description: "Texto exibido quando o campo está vazio",
      defaultValue: "Digite algo...",
    },
    className: {
      control: "text",
      description:
        "Permite adicionar classes CSS personalizadas ao campo de entrada",
      defaultValue: "",
    },
    type: {
      control: "select",
      options: ["text", "password", "email"],
      description: "Define o tipo de entrada do campo",
      defaultValue: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Nome",
    placeholder: "Digite seu nome",
  },
};

export const WithError: Story = {
  args: {
    label: "E-mail",
    placeholder: "Digite seu e-mail",
    error: "E-mail inválido",
  },
};

export const Password: Story = {
  args: {
    label: "Senha",
    type: "password",
    placeholder: "Digite sua senha",
  },
};

export const WithCustomClass: Story = {
  args: {
    label: "Endereço",
    placeholder: "Digite seu endereço",
    className: "bg-gray-100 border border-gray-300 p-4 rounded-lg",
  },
};
