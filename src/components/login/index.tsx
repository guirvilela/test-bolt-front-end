"use client";

import { AuthForm } from "../ui/auth";

interface LoginProps {
  username: string;
  password: string;
  error: string | null;
  loading: boolean;
  onSetUsername: (v: string) => void;
  onSetPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSetRegister: () => void;
}

export function Login({
  username,
  password,
  error,
  loading,
  onSetUsername,
  onSetPassword,
  onSubmit,
  onSetRegister,
}: LoginProps) {
  return (
    <AuthForm
      title="Login"
      username={username}
      password={password}
      error={error}
      loading={loading}
      onSetUsername={onSetUsername}
      onSetPassword={onSetPassword}
      onSubmit={onSubmit}
      onToggleMode={onSetRegister}
      toggleButtonText="Registrar"
      submitButtonText="Login"
    />
  );
}
