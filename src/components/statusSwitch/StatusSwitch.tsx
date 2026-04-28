import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, Switch } from "../ui";
interface StatusSwitchProps {
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

export const StatusSwitch = ({
  checked,
  entityName,
  disabled = false,
  isUpdating = false,
  onActivate,
  onDeactivate,
  dialogTitle = "¿Inactivar este registro?",
  dialogDescription = (name) => (
    <>Esta acción desactivará temporalmente <span className="font-semibold">{name}</span>.</>
  ),
  confirmLabel = "Aceptar",
}: StatusSwitchProps) => {
  const [open, setOpen] = useState(false);

  const handleChange = async (value: boolean) => {
    if (!value) {
      setOpen(true);   // solo pide confirmación al desactivar
      return;
    }
    await onActivate();
  };

  const handleConfirm = async () => {
    await onDeactivate();
    setOpen(false);
  };

  return (
    <>
      <Switch
        checked={checked}
        disabled={disabled || isUpdating}
        onCheckedChange={handleChange}
      />

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="border border-green-500 bg-green-50 text-green-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-700">{dialogTitle}</AlertDialogTitle>
            <AlertDialogDescription className="text-green-800">
              {dialogDescription(entityName)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating} onClick={() => setOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction disabled={isUpdating} onClick={handleConfirm}>
              {isUpdating ? "Inactivando..." : confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};