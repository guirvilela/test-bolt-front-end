export interface Operation {
  id?: string | number;
  userId?: string | number;
  type: "deposit" | "transfer" | `revert${string}` | "received";
  amount: number;
  timestamp: string | number;
  senderName?: string;
  senderId?: string | number;
  recipientName?: string;
  recipientId?: string | number;
  revertId: number;
  balance: number;
}
