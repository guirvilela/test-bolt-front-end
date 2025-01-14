import { pool } from "@/lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId"); // Alinhar com o frontend

  if (!userId) {
    return new Response(
      JSON.stringify({ message: "Id do usuário é obrigatório" }),
      { status: 400 }
    );
  }

  try {
    const [rows]: any = await pool.execute(
      "SELECT * FROM operations WHERE user_id = ? ORDER BY timestamp DESC",
      [userId]
    );

    if (!rows || rows.length === 0) {
      return new Response(
        JSON.stringify({
          message: "Nenhuma operação do usuário foi encontrada",
        }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ operations: rows }), { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar operações:", error);
    return new Response(
      JSON.stringify({ message: "Erro ao encontrar operações" }),
      { status: 500 }
    );
  }
}
