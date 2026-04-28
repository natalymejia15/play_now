import type { ColumnDef } from "@/interfaces";
import { useState, useMemo } from "react";

export function useDataTable<T extends Record<string, any>>(
  data: T[],
  columns: ColumnDef<T>[],
  searchKeys: (keyof T)[]
) {
  const [search, setSearch] = useState("");

  const initialVisibility = Object.fromEntries(
    columns.map((col) => [col.key, col.defaultVisible ?? true])
  );
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(initialVisibility);

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    return data.filter((row) =>
      searchKeys.some((key) =>
        String(row[key] ?? "").toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search, searchKeys]);

  return { search, setSearch, visibleColumns, setVisibleColumns, filtered };
}