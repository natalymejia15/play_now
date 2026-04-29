export interface LoginData {
  email: string
  password: string
}

export interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  onToggleForm: () => void;
}