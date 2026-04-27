import type { ColumnDef } from "@/interfaces";
import { useState, useMemo } from "react";

export function useDataTable<T extends Record<string, any>>(
  data: T[],
  columns: ColumnDef<T>[],
  searchKeys: (keyof T)[],
  primaryKey?: string
) {
  const [search, setSearch] = useState("");

  const initialVisibility = Object.fromEntries(
    columns.map((col) => [col.key, col.defaultVisible ?? true])
  );
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(initialVisibility);

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    const effectiveKeys: string[] =
      searchKeys && searchKeys.length > 0
        ? searchKeys.map((k) => String(k))
        : columns.map((c) => String(c.key));

    // always include primary key if provided
    if (primaryKey && !effectiveKeys.includes(primaryKey)) {
      effectiveKeys.unshift(primaryKey);
    }
    const getValue = (row: Record<string, any>, key: string) => {
      if (!key) return undefined;
      if (Object.prototype.hasOwnProperty.call(row, key)) return row[key];
      const parts = key.split('.');
      const value = parts.reduce((acc: any, part: string) => {
        if (acc === undefined || acc === null) return undefined;
        return acc[part];
      }, row as any);
      return value;
    };

    return data.filter((row) =>
      effectiveKeys.some((key) => {
        const value = getValue(row as Record<string, any>, key);
        if (value === undefined || value === null) return false;
        if (typeof value === 'object') {
          try {
            const text = Object.values(value).join(' ').toLowerCase();
            return text.includes(q);
          } catch {
            return JSON.stringify(value).toLowerCase().includes(q);
          }
        }
        return String(value).toLowerCase().includes(q);
      })
    );
  }, [data, search, searchKeys]);

  return { search, setSearch, visibleColumns, setVisibleColumns, filtered };
}