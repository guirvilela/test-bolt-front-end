import { Operation } from "../../operations/types";

export interface TransferResponse extends Omit<Operation, "type" | "revertId"> {
  type: "transfer";
  revertId?: never;
}
