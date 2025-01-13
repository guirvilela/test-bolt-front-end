"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Card() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full max-w-md mx-4 bg-white/10 backdrop-blur-lg border-white/20 border p-6 rounded-xl">
      <header className="space-y-1 flex item-center justify-center mb-4">
        <img src="/images/logo.svg" />
      </header>

      <section>
        <form className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-4 pt-4">
            <Button>Login</Button>

            <Button variant="secondary">Registrar</Button>
          </div>
        </form>
      </section>
    </div>
  );
}
