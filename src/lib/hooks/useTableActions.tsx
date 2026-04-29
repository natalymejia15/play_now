import { baseClass, type StandardActionHandlers, type Action } from "@/interfaces";
import { Eye, Pencil, Trash2 } from "lucide-react";

export function useTableActions<T>({
  onView,
  onEdit,
  onDelete,
}: StandardActionHandlers<T>): Action<T>[] {
  const actions: (Action<T> | undefined)[] = [
    onView   ? { icon: <Eye className="h-4 w-4" />,    label: "Ver",      className: baseClass, onClick: onView }   : undefined,
    onEdit   ? { icon: <Pencil className="h-4 w-4" />, label: "Editar",   className: baseClass, onClick: onEdit }   : undefined,
    onDelete ? { icon: <Trash2 className="h-4 w-4" />, label: "Eliminar", className: baseClass, onClick: onDelete } : undefined,
  ];

  return actions.filter((action): action is Action<T> => action !== undefined);
}