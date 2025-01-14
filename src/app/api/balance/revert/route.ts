import { pool } from "@/lib/db";

export async function POST(req: Request) {
  const { id, userId, amount, type, balanceAfterRevert } = await req.json();

  console.log(id, userId, amount, type, balanceAfterRevert);

  const parsedAmount = Number(amount);
  const parsedBalanceAfterRevert = Number(balanceAfterRevert);

  if (!userId || isNaN(parsedAmount) || isNaN(parsedBalanceAfterRevert)) {
    return new Response(JSON.stringify({ message: "Dados inválidos" }), {
      status: 400,
    });
  }

  try {
    if (type === "revert_deposit") {
      await pool.execute(
        "UPDATE users SET balance = balance - ? WHERE id = ?",
        [parsedBalanceAfterRevert, userId]
      );

      await pool.execute("SELECT balance FROM users WHERE id = ?", [userId]);

      const [insertResult] = await await pool.execute(
        "INSERT INTO operations (userId, type, amount, balanceAfter, revertId) VALUES (?, ?, ?, ?, ?)",
        [userId, "revert", parsedAmount, parsedBalanceAfterRevert, id]
      );

      const operationId = (insertResult as any).insertId;

      return new Response(
        JSON.stringify({
          id: operationId,
          userId,
          balance: parsedBalanceAfterRevert,
          revertId: id,
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Operação inválida para reversão" }),
        { status: 400 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Erro ao reverter a operação" }),
      { status: 500 }
    );
  }
}
