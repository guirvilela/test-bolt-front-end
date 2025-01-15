import { Loading } from "@/components/ui/loading";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Loading> = {
  title: "Example/Components/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    dark: {
      control: "boolean",
      description: "Define se o carregamento deve ser exibido com fundo escuro",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dark: false,
  },
};

export const Dark: Story = {
  args: {
    dark: true,
  },
};
