export interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  onToggleForm: () => void;
}