import type { RegisterFormData as ValidationRegisterFormData } from "@/lib";

export type RegisterFormData = ValidationRegisterFormData & { idRol?: number };

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  onToggleForm: () => void;
}