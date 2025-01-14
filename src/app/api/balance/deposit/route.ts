import { pool } from "@/lib/db";

export async function POST(req: Request) {
  const { depositAmount, userId } = await req.json();

  if (
    !depositAmount ||
    isNaN(Number(depositAmount)) ||
    Number(depositAmount) <= 0
  ) {
    return new Response(
      JSON.stringify({ message: "Valor do depósito inválido" }),
      { status: 400 }
    );
  }

  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);

    if (!rows || (rows as any[]).length === 0) {
      return new Response(
        JSON.stringify({ message: "Usuário não encontrado" }),
        { status: 404 }
      );
    }

    const user = (rows as any[])[0];
    const deposit = Number(depositAmount);
    const newBalance = Number(user.balance) + deposit;

    await pool.execute("UPDATE users SET balance = ? WHERE id = ?", [
      newBalance,
      user.id,
    ]);

    await pool.execute(
      "INSERT INTO operations (user_id, type, amount, balance_after) VALUES (?, ?, ?, ?)",
      [user.id, "deposit", deposit, newBalance]
    );

    return new Response(
      JSON.stringify({
        id: user.id,
        name: user.username,
        email: user.email,
        balance: newBalance,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao processar o depósito:", error);

    return new Response(
      JSON.stringify({
        message: "Erro ao processar o depósito",
      }),
      { status: 500 }
    );
  }
}
