import { AuthForm } from "@/components/ui/auth";
import { Meta, StoryObj } from "@storybook/react";

// Configuração principal do Storybook
const meta: Meta<typeof AuthForm> = {
  title: "Example/Components/AuthForm",
  component: AuthForm,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Título do formulário",
      defaultValue: "Login",
    },
    username: {
      control: "text",
      description: "Nome de usuário",
      defaultValue: "testuser",
    },
    password: {
      control: "text",
      description: "Senha",
      defaultValue: "password",
    },
    email: {
      control: "text",
      description: "E-mail do usuário (se `showEmail` for verdadeiro)",
      defaultValue: "",
    },
    error: {
      control: "text",
      description: "Mensagem de erro a ser exibida",
      defaultValue: "",
    },
    loading: {
      control: "boolean",
      description: "Exibe um estado de carregamento no botão",
      defaultValue: false,
    },
    showEmail: {
      control: "boolean",
      description: "Exibe o campo de e-mail",
      defaultValue: false,
    },
    submitButtonText: {
      control: "text",
      description: "Texto do botão de envio",
      defaultValue: "Login",
    },
    toggleButtonText: {
      control: "text",
      description: "Texto do botão de alternância",
      defaultValue: "Switch to Signup",
    },
    onSetUsername: {
      action: "setUsername",
      description: "Callback para atualizar o nome de usuário",
    },
    onSetPassword: {
      action: "setPassword",
      description: "Callback para atualizar a senha",
    },
    onSetEmail: {
      action: "setEmail",
      description: "Callback para atualizar o e-mail (se aplicável)",
    },
    onSubmit: {
      action: "submit",
      description: "Callback de submit do formulário",
    },
    onToggleMode: {
      action: "toggleMode",
      description: "Callback de alternância entre Login e Signup",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Login",
    username: "usuario",
    password: "senha",
    error: null,
    loading: false,
    submitButtonText: "Login",
    toggleButtonText: "Registrar",
  },
};

export const WithError: Story = {
  args: {
    title: "Login",
    username: "usuario",
    password: "senha",
    error: "Usuário ou senha inválidos",
    loading: false,
    submitButtonText: "Login",
    toggleButtonText: "Switch to Signup",
  },
};

export const LoadingState: Story = {
  args: {
    title: "Login",
    username: "usuario",
    password: "senha",
    error: null,
    loading: true,
    submitButtonText: "Login",
    toggleButtonText: "Registrar",
  },
};

export const WithEmailField: Story = {
  args: {
    title: "Login",
    username: "usuario",
    password: "senha",
    showEmail: true,
    email: "testuser@example.com",
    error: null,
    loading: false,
    submitButtonText: "Login",
    toggleButtonText: "Registrar",
  },
};
