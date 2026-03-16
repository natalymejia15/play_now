import { Funnel } from "lucide-react";
import { Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tooltip, TooltipContent, TooltipTrigger } from "../ui";
import type { Props } from "@/interfaces";

export function DataTable<T extends Record<string, any>>({
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
                        <Button variant="outline" size="icon"><Funnel /></Button>
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
                        {actions && <TableHead className="text-right">Acciones</TableHead>}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={activeColumns.length + (actions ? 2 : 1)}
                                className="text-center text-muted-foreground"
                            >
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row) => (
                            <TableRow key={keyExtractor(row)}>
                                {/* Columna primaria siempre visible */}
                                <TableCell>
                                    {primaryColumn.render
                                        ? primaryColumn.render(row)
                                        : row[primaryColumn.key]}
                                </TableCell>

                                {/* Columnas togglables */}
                                {activeColumns.map((col) => (
                                    <TableCell key={col.key}>
                                        {col.render ? col.render(row) : row[col.key] ?? "-"}
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
                                                    <TooltipContent>{action.label}</TooltipContent>
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
        </div>
    );
}