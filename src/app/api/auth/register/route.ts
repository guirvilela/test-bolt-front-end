// src/app/api/auth/register/route.ts

import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  // Desestruturação para pegar os campos
  const { username, password, email } = await req.json();

  // Validação dos dados recebidos
  if (!username || !password || !email) {
    return new Response(
      JSON.stringify({ message: "Usuário, senha e email são obrigatórios" }),
      {
        status: 400,
      }
    );
  }

  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if ((rows as any).length > 0) {
      return new Response(
        JSON.stringify({ message: "Este email já está registrado" }),
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
      [username, hashedPassword, email]
    );

    const userId = (result as any).insertId;

    return new Response(
      JSON.stringify({ id: userId, name: username, email: email }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Erro ao registrar usuário" }),
      {
        status: 500,
      }
    );
  }
}
