import { Operation } from "../../operations/types";

export interface DepositResponse extends Omit<Operation, "type" | "revertId"> {
  type: "deposit";
  revertId?: never;
}
