import type { ColumnDef } from "./hook.Interface";

export type Action<T> = {
  icon: React.ReactNode;
  label: string;
  className?: string;
  onClick: (row: T) => void;
};

export type Props<T extends Record<string, any>> = {
  data: T[];
  columns: ColumnDef<T>[];
  visibleColumns: Record<string, boolean>;
  setVisibleColumns: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  search: string;
  setSearch: (v: string) => void;
  actions?: Action<T>[];
  keyExtractor: (row: T) => string | number;
  emptyMessage?: string;
  searchPlaceholder?: string;
  primaryColumn: ColumnDef<T>;
};
