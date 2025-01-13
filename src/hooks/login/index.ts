"use client";
import { User } from "@/app/api/auth/login/types";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React from "react";
import { loginValidation, registerValidation } from "./validation";

export function useHomeController() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState<boolean>(false);

  const { setUser } = useAuthContext();

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = loginValidation.safeParse({ username, password });

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0]?.message;
      setError(errorMessage);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data: User = await res.json();

      if (res.ok) {
        setUser(data);

        router.push("/dashboard");
      } else {
        setError("Usuário ou senha invalido");
      }
    } catch (err) {
      setError("Erro ao se conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = registerValidation.safeParse({
      username,
      password,
      email,
    });

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0]?.message;
      setError(errorMessage);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      const data: User = await res.json();

      if (res.ok) {
        router.push("/dashboard");
        setUser(data);
        handleSetUsername("");
        handleSetPassword("");
        handleSetEmail("");
        setError("");
        setLoading(false);
        setIsRegister(false);
      } else {
        setError("Erro ao registrar. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao se conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleSetUsername = React.useCallback(
    (username: string) => {
      setUsername(username);
    },
    [username]
  );

  const handleSetPassword = React.useCallback(
    (password: string) => {
      setPassword(password);
    },
    [password]
  );

  const handleSetEmail = React.useCallback(
    (email: string) => {
      setEmail(email);
    },
    [email]
  );

  const handleSetIsRegister = React.useCallback(
    (register: boolean) => {
      setIsRegister(register);
    },
    [isRegister]
  );

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      if (isRegister) {
        handleRegister(e);
      } else {
        handleLogin(e);
      }
    },
    [isRegister, email, username, password]
  );

  return {
    username,
    password,
    isRegister,
    loginValidation,
    error,
    loading,
    email,
    handleSetEmail,
    handleSetIsRegister,
    handleSetUsername,
    handleSetPassword,
    handleSubmit,
  };
}
