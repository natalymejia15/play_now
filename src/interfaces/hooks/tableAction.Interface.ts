export type StandardActionHandlers<T> = {
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

export const baseClass = "text-green-600 hover:bg-green-100";
