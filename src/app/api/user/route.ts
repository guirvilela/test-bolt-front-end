import { pool } from "@/lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response(
      JSON.stringify({ message: "Id do usuário é obrigatório" }),
      { status: 400 }
    );
  }

  try {
    const [rows]: any = await pool.execute(
      "SELECT id, username, email, balance FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ message: "Usuário não encontrado" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(rows[0]), { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return new Response(
      JSON.stringify({ message: "Erro ao encontrar usuário" }),
      { status: 500 }
    );
  }
}
