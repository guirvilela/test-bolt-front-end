"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loading } from "../loading";

interface AuthFormProps {
  title: string;
  showEmail?: boolean;
  username: string;
  password: string;
  email?: string;
  error: string | null;
  loading: boolean;
  onSetUsername: (v: string) => void;
  onSetPassword: (v: string) => void;
  onSetEmail?: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleMode: () => void;
  toggleButtonText: string;
  submitButtonText: string;
}

export function AuthForm({
  title,
  showEmail = false,
  username,
  password,
  email,
  error,
  loading,
  onSetUsername,
  onSetPassword,
  onSetEmail,
  onSubmit,
  onToggleMode,
  toggleButtonText,
  submitButtonText,
}: AuthFormProps) {
  return (
    <div className="w-full max-w-md mx-4 bg-white/10 backdrop-blur-lg border-white/20 border p-6 rounded-xl">
      <header className="space-y-1 flex items-center justify-center mb-4">
        <img src="/images/logo.svg" />
      </header>

      <div className="flex items-center justify-center w-full mb-4">
        <h3 className="text-2xl text-white font-medium">{title}</h3>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="input-group">
          <Input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => onSetUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => onSetPassword(e.target.value)}
            required
          />
        </div>
        {showEmail && onSetEmail && (
          <div className="input-group">
            <Input
              type="email"
              placeholder="E-mail"
              value={email || ""}
              onChange={(e) => onSetEmail(e.target.value)}
              required
            />
          </div>
        )}

        {error && <div className="text-red-700">{error}</div>}

        <Button type="submit" disabled={loading}>
          {loading ? <Loading /> : submitButtonText}
        </Button>
      </form>

      <Button variant="secondary" onClick={onToggleMode} className="mt-4">
        {toggleButtonText}
      </Button>
    </div>
  );
}
