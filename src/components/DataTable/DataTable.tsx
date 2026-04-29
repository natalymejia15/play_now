import { Funnel } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui";

import type { Props } from "@/interfaces";
import { useState, useEffect, useMemo } from "react";

export function DataTable<T extends object>({
  data,
  columns,
  visibleColumns,
  setVisibleColumns,
  search,
  setSearch,
  actions,
  keyExtractor,
  emptyMessage = "No hay datos registrados",
  searchPlaceholder = "Buscar...",
  primaryColumn,
}: Props<T>) {

  const toggleColumn = (key: string, value: boolean) =>
    setVisibleColumns((prev) => ({ ...prev, [key]: !!value }));

  const activeColumns = columns.filter((col) => visibleColumns[col.key]);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  // ✅ FIX warning useEffect
  const safeData = useMemo(() => {
    return Array.isArray(data) ? data : [];
  }, [data]);

  const totalPages = Math.ceil(safeData.length / pageSize);

  useEffect(() => {
    setPage(1);
  }, [safeData]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages || 1);
    }
  }, [totalPages, page]);

  const paginatedData = safeData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // ✅ SIN any
  const getValue = (row: T, key: string): unknown => {
    if (!key) return undefined;

    if (Object.prototype.hasOwnProperty.call(row, key)) {
      return row[key as keyof T];
    }

    return key.split(".").reduce<unknown>((acc, part) => {
      if (acc === undefined || acc === null) return undefined;

      if (typeof acc === "object") {
        return (acc as Record<string, unknown>)[part];
      }

      return undefined;
    }, row);
  };

  return (
    <div className="border rounded-lg">

      <div className="p-4 border-b flex items-center justify-between">
        <Input
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Funnel />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {columns.map((col) => (
              <DropdownMenuCheckboxItem
                key={col.key}
                checked={visibleColumns[col.key]}
                onCheckedChange={(v) => toggleColumn(col.key, v)}
              >
                {col.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>

        <TableHeader>
          <TableRow>
            <TableHead>{primaryColumn.label}</TableHead>

            {activeColumns.map((col) => (
              <TableHead key={col.key}>{col.label}</TableHead>
            ))}

            {actions && (
              <TableHead className="text-right">Acciones</TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>

          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={activeColumns.length + (actions ? 2 : 1)}
                className="text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, index) => (
              <TableRow
                key={
                  keyExtractor
                    ? keyExtractor(row)
                    : index
                }
              >

                {/* Columna primaria */}
                <TableCell>
                  {primaryColumn.render
                    ? primaryColumn.render(row)
                    : String(getValue(row, primaryColumn.key) ?? "-")}
                </TableCell>

                {/* Columnas visibles */}
                {activeColumns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render
                      ? col.render(row)
                      : String(getValue(row, col.key) ?? "-")}
                  </TableCell>
                ))}

                {/* Acciones */}
                {actions && (
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      {actions.map((action, i) => (
                        <Tooltip key={i}>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={action.className}
                              onClick={() => action.onClick(row)}
                            >
                              {action.icon}
                            </Button>
                          </TooltipTrigger>

                          <TooltipContent>
                            {action.label}
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </TableCell>
                )}

              </TableRow>
            ))
          )}

        </TableBody>
      </Table>

      <div className="flex items-center justify-between p-4 border-t">

        <span className="text-sm text-muted-foreground">
          Página {page} de {totalPages || 1}
        </span>

        <div className="flex gap-2">

          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Anterior
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((p) => p + 1)}
          >
            Siguiente
          </Button>

        </div>

      </div>

    </div>
  );
}