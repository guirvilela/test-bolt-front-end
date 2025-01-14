import { Operation } from "../../operations/types";

export interface TransferResponse extends Omit<Operation, "type" | "revertId"> {
  type: "transfer"; // Agora o tipo é restrito a "transfer"
  revertId?: never; // Não precisa de revertId
}
