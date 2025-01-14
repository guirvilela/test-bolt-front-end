import { Operation } from "../../operations/types";

export interface RevertResponse extends Omit<Operation, "type" | "revertId"> {
  type: string;
  revertId: string | number | undefined;
}
