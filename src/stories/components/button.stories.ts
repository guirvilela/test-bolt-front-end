import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";

// Configuração principal do Storybook
const meta: Meta<typeof Button> = {
  title: "Example/Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "Define o estilo do botão",
      defaultValue: "primary",
    },
    fullWidth: {
      control: "boolean",
      description: "Determina se o botão ocupa toda a largura",
      defaultValue: true,
    },
    loading: {
      control: "boolean",
      description: "Exibe um estado de carregamento",
      defaultValue: false,
    },
    children: {
      control: "text",
      description: "Conteúdo dentro do botão",
      defaultValue: "Button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Variantes do botão
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Loading: Story = {
  args: {
    variant: "primary",
    children: "Loading Button",
    loading: true,
  },
};

export const FullWidth: Story = {
  args: {
    variant: "primary",
    children: "Full Width Button",
    fullWidth: true,
  },
};

export const Small: Story = {
  args: {
    variant: "primary",
    children: "Small Button",
    className: "text-sm px-2 py-1",
  },
};
