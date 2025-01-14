import { pool } from "@/lib/db";

export async function POST(req: Request) {
  const { transferAmount, senderId, receiverId } = await req.json();

  if (
    !transferAmount ||
    isNaN(Number(transferAmount)) ||
    Number(transferAmount) <= 0
  ) {
    return new Response(
      JSON.stringify({ message: "Valor da transferência inválido" }),
      { status: 400 }
    );
  }

  if (Number(senderId) === Number(receiverId)) {
    return new Response(
      JSON.stringify({ message: "Você não pode transferir para si mesmo" }),
      { status: 400 }
    );
  }

  try {
    const [senderRows] = await pool.execute(
      "SELECT * FROM users WHERE id = ?",
      [senderId]
    );

    if (!senderRows || (senderRows as any[]).length === 0) {
      console.error(`Usuário remetente com ID ${senderId} não encontrado`);
      return new Response(
        JSON.stringify({ message: "Usuário remetente não encontrado" }),
        { status: 404 }
      );
    }

    const sender = (senderRows as any[])[0];
    const transfer = Number(transferAmount);

    if (Number(sender.balance) < transfer) {
      console.error(`Saldo insuficiente para o remetente (ID: ${senderId})`);
      return new Response(
        JSON.stringify({ message: "Saldo insuficiente para transferência" }),
        { status: 400 }
      );
    }

    const [receiverRows] = await pool.execute(
      "SELECT * FROM users WHERE id = ?",
      [receiverId]
    );

    if (!receiverRows || (receiverRows as any[]).length === 0) {
      return new Response(
        JSON.stringify({
          message: "Usuário que será feita transferência, não encontrado",
        }),
        { status: 404 }
      );
    }

    const receiver = (receiverRows as any[])[0];

    const newSenderBalance = Number(sender.balance) - transfer;
    await pool.execute("UPDATE users SET balance = ? WHERE id = ?", [
      newSenderBalance,
      sender.id,
    ]);

    const newReceiverBalance = Number(receiver.balance) + transfer;
    await pool.execute("UPDATE users SET balance = ? WHERE id = ?", [
      newReceiverBalance,
      receiver.id,
    ]);

    await pool.execute(
      "INSERT INTO operations (userId, type, amount, balanceAfter) VALUES (?, ?, ?, ?)",
      [sender.id, "transfer", -transfer, newSenderBalance]
    );

    await pool.execute(
      "INSERT INTO operations (userId, type, amount, balanceAfter, senderId) VALUES (?, ?, ?, ?, ?)",
      [receiver.id, "received", transfer, newReceiverBalance, sender.id]
    );

    return new Response(
      JSON.stringify({
        senderId: sender.id,
        senderName: sender.username,
        senderBalance: newSenderBalance,
        receiverId: receiver.id,
        receiverName: receiver.username,
        receiverBalance: newReceiverBalance,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao processar a transferência:", error);
    return new Response(
      JSON.stringify({ message: "Erro ao processar a transferência" }),
      { status: 500 }
    );
  }
}
