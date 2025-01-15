import { pool } from "@/lib/db";

export async function POST(req: Request) {
  const {
    id,
    userId,
    amount,
    type,
    balanceAfterRevert,
    senderId,
    recipientId,
    recipientName,
  } = await req.json();

  const parsedAmount = Number(amount);
  const parsedBalanceAfterRevert = Number(balanceAfterRevert);

  try {
    if (type === "revert_deposit") {
      if (!userId || isNaN(parsedAmount) || isNaN(parsedBalanceAfterRevert)) {
        return new Response(JSON.stringify({ message: "Dados inválidos" }), {
          status: 400,
        });
      }

      await pool.execute(
        "UPDATE users SET balance = balance - ? WHERE id = ?",
        [parsedAmount, userId]
      );

      const [insertResult] = await pool.execute(
        "INSERT INTO operations (userId, type, amount, balanceAfter, revertId, recipientName) VALUES (?, ?, ?, ?, ?, ?)",
        [
          userId,
          "revert",
          parsedAmount,
          parsedBalanceAfterRevert,
          id,
          recipientName,
        ]
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
    } else if (type === "revert_transfer") {
      if (senderId === userId) {
        await pool.execute(
          "UPDATE users SET balance = balance + ? WHERE id = ?",
          [Math.abs(parsedAmount), senderId]
        );
      }

      if (recipientId !== userId) {
        await pool.execute(
          "UPDATE users SET balance = balance - ? WHERE id = ?",
          [Math.abs(parsedAmount), recipientId]
        );
      }

      const [insertResultSender] = await pool.execute(
        "INSERT INTO operations (userId, type, amount, balanceAfter, revertId, recipientName) VALUES (?, ?, ?, ?, ?, ?)",
        [
          userId,
          "revert_transfer",
          Math.abs(parsedAmount),
          parsedBalanceAfterRevert,
          id,
          recipientName,
        ]
      );

      const operationIdSender = (insertResultSender as any).insertId;

      const [insertResultRecipient] = await pool.execute(
        "INSERT INTO operations (userId, type, amount, balanceAfter, revertId, recipientName) VALUES (?, ?, ?, ?, ?, ?)",
        [
          recipientId,
          "revert_transfer",
          Math.abs(parsedAmount),
          parsedBalanceAfterRevert,
          id,
          senderId,
        ]
      );

      const operationIdRecipient = (insertResultRecipient as any).insertId;

      return new Response(
        JSON.stringify({
          senderOperationId: operationIdSender,
          recipientOperationId: operationIdRecipient,
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
