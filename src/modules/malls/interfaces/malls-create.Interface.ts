import type { IAdmin, IMall } from "./malls.Interface";

export interface ICreateMallPayload {
    mall: IMall;
    admin: IAdmin;
}

export interface CreateMallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
