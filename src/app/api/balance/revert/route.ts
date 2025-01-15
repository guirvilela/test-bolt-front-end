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

      // Reverter depósito (subtrair do saldo)
      await pool.execute(
        "UPDATE users SET balance = balance - ? WHERE id = ?",
        [parsedAmount, userId] // Diminuir o saldo do usuário
      );

      // Registra a operação de reversão
      const [insertResult] = await pool.execute(
        "INSERT INTO operations (userId, type, amount, balanceAfter, revertId, recipientName) VALUES (?, ?, ?, ?, ?, ?)", // Adiciona recipientName
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
      // Reverter transferência: Ajusta saldo do remetente e destinatário
      if (senderId === userId) {
        // O saldo do remetente deve ser aumentado
        await pool.execute(
          "UPDATE users SET balance = balance + ? WHERE id = ?",
          [Math.abs(parsedAmount), senderId] // Restitui o valor ao remetente
        );
      }

      if (recipientId !== userId) {
        // O saldo do destinatário deve ser diminuído
        await pool.execute(
          "UPDATE users SET balance = balance - ? WHERE id = ?",
          [Math.abs(parsedAmount), recipientId] // Deduz o valor do destinatário
        );
      }

      // Registra a operação de reversão da transferência para o remetente
      const [insertResultSender] = await pool.execute(
        "INSERT INTO operations (userId, type, amount, balanceAfter, revertId, recipientName) VALUES (?, ?, ?, ?, ?, ?)", // Adiciona recipientName
        [
          userId,
          "revert_transfer",
          Math.abs(parsedAmount),
          parsedBalanceAfterRevert,
          id,
          recipientName, // Salva o nome do destinatário
        ]
      );

      const operationIdSender = (insertResultSender as any).insertId;

      // Registra a operação de reversão da transferência para o destinatário
      const [insertResultRecipient] = await pool.execute(
        "INSERT INTO operations (userId, type, amount, balanceAfter, revertId, recipientName) VALUES (?, ?, ?, ?, ?, ?)", // Adiciona recipientName
        [
          recipientId,
          "revert_transfer", // Mesmo tipo de operação para o destinatário
          Math.abs(parsedAmount),
          parsedBalanceAfterRevert,
          id,
          senderId, // O nome do remetente é salvo para o destinatário
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
