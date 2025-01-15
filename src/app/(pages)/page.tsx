"use client";
import { Login } from "@/components/login";
import { Register } from "@/components/register";
import { useHomeController } from "@/hooks/login";
import Head from "next/head";

export default function Home() {
  const {
    error,
    loading,
    isRegister,
    username,
    password,
    email,
    handleSetEmail,
    onClearFields,
    handleSetIsRegister,
    handleSubmit,
    handleSetPassword,
    handleSetUsername,
  } = useHomeController();

  return (
    <>
      <Head>
        <title>Bolt | Login </title>
      </Head>

      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-800 to-cyan-400">
        {isRegister ? (
          <Register
            username={username}
            password={password}
            email={email}
            error={error}
            loading={loading}
            onSetUsername={handleSetUsername}
            onSetPassword={handleSetPassword}
            onSetEmail={handleSetEmail}
            onSubmit={handleSubmit}
            onSetRegister={() => {
              handleSetIsRegister(false), onClearFields();
            }}
          />
        ) : (
          <Login
            username={username}
            password={password}
            error={error}
            loading={loading}
            onSetUsername={handleSetUsername}
            onSetPassword={handleSetPassword}
            onSubmit={handleSubmit}
            onSetRegister={() => handleSetIsRegister(true)}
          />
        )}
      </div>
    </>
  );
}
