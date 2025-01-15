import { pool } from "@/lib/db";

export async function POST(req: Request) {
  const { transferAmount, senderId, receiverId } = await req.json();

  // Validação do valor da transferência
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

  // Impede transferências para si mesmo
  if (Number(senderId) === Number(receiverId)) {
    return new Response(
      JSON.stringify({ message: "Você não pode transferir para si mesmo" }),
      { status: 400 }
    );
  }

  try {
    // Verifica se o remetente existe
    const [senderRows] = await pool.execute(
      "SELECT * FROM users WHERE id = ?",
      [senderId]
    );

    if (!senderRows || (senderRows as any[]).length === 0) {
      return new Response(
        JSON.stringify({ message: "Usuário remetente não encontrado" }),
        { status: 404 }
      );
    }

    const sender = (senderRows as any[])[0];
    const transfer = Number(transferAmount);

    // Verifica saldo do remetente
    if (Number(sender.balance) < transfer) {
      return new Response(
        JSON.stringify({ message: "Saldo insuficiente para transferência" }),
        { status: 400 }
      );
    }

    // Verifica se o receptor existe
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

    // Atualiza o saldo do remetente
    const newSenderBalance = Number(sender.balance) - transfer;
    await pool.execute("UPDATE users SET balance = ? WHERE id = ?", [
      newSenderBalance,
      sender.id,
    ]);

    // Atualiza o saldo do receptor
    const newReceiverBalance = Number(receiver.balance) + transfer;
    await pool.execute("UPDATE users SET balance = ? WHERE id = ?", [
      newReceiverBalance,
      receiver.id,
    ]);

    // Registra a operação de transferência do remetente
    await pool.execute(
      "INSERT INTO operations (userId, type, amount, balanceAfter, senderId, recipientId, recipientName) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        sender.id,
        "transfer",
        -transfer,
        newSenderBalance,
        sender.id,
        receiver.id,
        receiver.username, // Adiciona recipientName
      ]
    );

    // Registra a operação de recebimento para o receptor, incluindo o senderId e recipientName
    await pool.execute(
      "INSERT INTO operations (userId, type, amount, balanceAfter, senderId, recipientId, recipientName) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        receiver.id,
        "received",
        transfer,
        newReceiverBalance,
        sender.id,
        receiver.id,
        receiver.username, // Adiciona recipientName
      ]
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
    return new Response(
      JSON.stringify({ message: "Erro ao processar a transferência" }),
      { status: 500 }
    );
  }
}
