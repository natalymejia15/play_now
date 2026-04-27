export interface StatusSwitchProps {
  checked: boolean;
  entityName: string;
  disabled?: boolean;
  isUpdating?: boolean;
  onActivate: () => Promise<void>;      
  onDeactivate: () => Promise<void>;     
  dialogTitle?: string;
  dialogDescription?: (name: string) => React.ReactNode;
  confirmLabel?: string;
}