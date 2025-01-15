import { pool } from "@/lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return new Response(
      JSON.stringify({ message: "Id do usuário é obrigatório" }),
      { status: 400 }
    );
  }

  try {
    const [operations]: any = await pool.execute(
      "SELECT * FROM operations WHERE userId = ? ORDER BY timestamp DESC",
      [userId]
    );

    if (!operations || operations.length === 0) {
      return new Response(
        JSON.stringify({
          message: "Nenhuma operação do usuário foi encontrada",
        }),
        { status: 404 }
      );
    }

    const operationsWithNames = await Promise.all(
      operations.map(async (operation: any) => {
        let senderName = null;
        let recipientName = null;

        if (operation.senderId) {
          const [senderRows]: any = await pool.execute(
            "SELECT username FROM users WHERE id = ?",
            [operation.senderId]
          );
          senderName =
            senderRows.length > 0 ? senderRows[0].username : "Desconhecido";
        }

        if (operation.recipientId) {
          // Corrigido para recipientId
          const [recipientRows]: any = await pool.execute(
            "SELECT username FROM users WHERE id = ?",
            [operation.recipientId] // Corrigido para recipientId
          );
          recipientName =
            recipientRows.length > 0
              ? recipientRows[0].username
              : "Desconhecido";
        }

        return {
          ...operation,
          senderName,
          recipientName,
        };
      })
    );

    return new Response(JSON.stringify({ operations: operationsWithNames }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Erro ao encontrar operações" }),
      { status: 500 }
    );
  }
}
