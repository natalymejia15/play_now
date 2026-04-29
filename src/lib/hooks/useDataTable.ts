import type { ColumnDef } from "@/interfaces";
import { useState, useMemo } from "react";

function getNestedValue(row: object, key: string): unknown {
  if (!key) return undefined;
  const r = row as Record<string, unknown>;
  if (Object.prototype.hasOwnProperty.call(r, key)) return r[key];
  return key.split('.').reduce((acc: unknown, part: string) => {
    if (acc === null || acc === undefined) return undefined;
    return (acc as Record<string, unknown>)[part];
  }, r);
}

export function useDataTable<T extends object>(  
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

    if (primaryKey && !effectiveKeys.includes(primaryKey)) {
      effectiveKeys.unshift(primaryKey);
    }

    return data.filter((row) =>
      effectiveKeys.some((key) => {
        const value = getNestedValue(row, key);
        if (value === undefined || value === null) return false;
        if (typeof value === 'object') {
          try {
            return Object.values(value as Record<string, unknown>).join(' ').toLowerCase().includes(q);
          } catch {
            return JSON.stringify(value).toLowerCase().includes(q);
          }
        }
        return String(value).toLowerCase().includes(q);
      })
    );
  }, [data, search, searchKeys, columns, primaryKey]);

  return { search, setSearch, visibleColumns, setVisibleColumns, filtered };
}