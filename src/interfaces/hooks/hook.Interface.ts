import type { UserFormData } from "../user"

export interface UseFormDataReturn<T> {
  formData: T
  setFormData: (newData: T) => void
  updateFormData: (newData: Partial<T> | T) => void
  resetFormData: () => void
}
export type FieldConfig = {
  id: keyof UserFormData
  label: string
  placeholder: string
  type?: string
}

export type ColumnDef<T> = {
  key: string;
  label: string;
  defaultVisible?: boolean;
  render?: (row: T) => React.ReactNode;
};