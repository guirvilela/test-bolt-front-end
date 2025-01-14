import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";
import { User } from "./types";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return new Response(
      JSON.stringify({ message: "Usuário e senha são obrigatórios" }),
      { status: 400 }
    );
  }

  try {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (!rows || (rows as any[]).length === 0) {
      return new Response(
        JSON.stringify({ message: "Credenciais inválidas" }),
        { status: 401 }
      );
    }

    const user: User = (rows as any[])[0];

    const isPasswordValid = await bcrypt.compare(password, user.password!);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Credenciais inválidas" }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        id: user.id,
        name: user.username,
        email: user.email,
        balance: user.balance,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Erro ao fazer login" }), {
      status: 500,
    });
  }
}
