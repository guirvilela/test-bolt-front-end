"use client";

import { AuthForm } from "../ui/auth";

interface RegisterProps {
  username: string;
  password: string;
  email: string;
  error: string | null;
  loading: boolean;
  onSetUsername: (v: string) => void;
  onSetPassword: (v: string) => void;
  onSetEmail: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSetRegister: () => void;
}

export function Register({
  username,
  password,
  email,
  error,
  loading,
  onSetUsername,
  onSetPassword,
  onSetEmail,
  onSubmit,
  onSetRegister,
}: RegisterProps) {
  return (
    <AuthForm
      title="Registrar"
      showEmail
      username={username}
      password={password}
      email={email}
      error={error}
      loading={loading}
      onSetUsername={onSetUsername}
      onSetPassword={onSetPassword}
      onSetEmail={onSetEmail}
      onSubmit={onSubmit}
      onToggleMode={onSetRegister}
      toggleButtonText="Voltar"
      submitButtonText="Registrar"
    />
  );
}
