import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
  TooltipProvider,
  TooltipTrigger,
} from "@/components";

import { useMallsTable } from "../hooks";
import { Eye, Funnel, Pencil, Trash2 } from "lucide-react";
import { EditMallDialog } from "./EditMallDialog";

export const MallsTable = () => {
  const {
    malls,
    isEditDialogOpen,
    setIsEditDialogOpen,
    mallToEdit,
    handleEdit,
    handleDeleteClick,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleConfirmDelete,
    handleViewMall,
    mallToDelete,
    search,
    setSearch,
    filteredMalls,
    visibleColumns,
    setVisibleColumns
  } = useMallsTable();


  return (
    <div className="border rounded-lg">
      <div className="p-4 border-b flex items-center justify-between">
        <Input
          placeholder="Buscar centro comercial..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline"  size="icon"> <Funnel/></Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">

            <DropdownMenuCheckboxItem
              checked={visibleColumns.direccion}
              onCheckedChange={(value) =>
                setVisibleColumns((prev) => ({ ...prev, direccion: !!value }))
              }
            >
              Dirección
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
              checked={visibleColumns.telefono}
              onCheckedChange={(value) =>
                setVisibleColumns((prev) => ({ ...prev, telefono: !!value }))
              }
            >
              Teléfono
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
              checked={visibleColumns.ciudad}
              onCheckedChange={(value) =>
                setVisibleColumns((prev) => ({ ...prev, ciudad: !!value }))
              }
            >
              Ciudad
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
              checked={visibleColumns.administrador}
              onCheckedChange={(value) =>
                setVisibleColumns((prev) => ({ ...prev, administrador: !!value }))
              }
            >
              Administrador
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
              checked={visibleColumns.correo}
              onCheckedChange={(value) =>
                setVisibleColumns((prev) => ({ ...prev, correo: !!value }))
              }
            >
              Correo
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
              checked={visibleColumns.celular}
              onCheckedChange={(value) =>
                setVisibleColumns((prev) => ({ ...prev, celular: !!value }))
              }
            >
              Celular
            </DropdownMenuCheckboxItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Centro Comercial</TableHead>

            {visibleColumns.direccion && <TableHead>Dirección</TableHead>}
            {visibleColumns.telefono && <TableHead>Teléfono</TableHead>}
            {visibleColumns.ciudad && <TableHead>Ciudad</TableHead>}
            {visibleColumns.administrador && <TableHead>Administrador</TableHead>}
            {visibleColumns.correo && <TableHead>Correo</TableHead>}
            {visibleColumns.celular && <TableHead>Celular</TableHead>}

            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {malls.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center text-muted-foreground"
              >
                No hay centros comerciales registrados
              </TableCell>
            </TableRow>
          ) : (
            filteredMalls.map((mall) => (
              <TableRow key={mall.id}>
                <TableCell>{mall.nombreCentro}</TableCell>

                {visibleColumns.direccion && (
                  <TableCell>{mall.direccion}</TableCell>
                )}

                {visibleColumns.telefono && (
                  <TableCell>{mall.telefono}</TableCell>
                )}

                {visibleColumns.ciudad && (
                  <TableCell>{mall.ciudad}</TableCell>
                )}

                {visibleColumns.administrador && (
                  <TableCell>
                    {mall.administrador
                      ? `${mall.administrador.primerNombre} ${mall.administrador.primerApellido}`
                      : "Sin asignar"}
                  </TableCell>
                )}

                {visibleColumns.correo && (
                  <TableCell>{mall.administrador?.correo || "-"}</TableCell>
                )}

                {visibleColumns.celular && (
                  <TableCell>{mall.administrador?.celular || "-"}</TableCell>
                )}

                <TableCell>
                  <TooltipProvider>
                    <div className="flex justify-end gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-600 hover:bg-green-100"
                            onClick={() => handleViewMall(mall.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Ver centro comercial
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-600 hover:bg-green-100"
                            onClick={() => handleEdit(mall)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Editar
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-600 hover:bg-green-100"
                            onClick={() => handleDeleteClick(mall)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Eliminar
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <EditMallDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        mall={mallToEdit}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="border border-green-500 bg-green-50 text-green-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-700">
              ¿Eliminar este centro comercial?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-green-800">
              Esta acción eliminará permanentemente{" "}
              <span className="font-semibold">
                {mallToDelete?.nombreCentro}
              </span>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg">
              Cancelar
            </AlertDialogCancel>

            <AlertDialogAction
              className="rounded-lg"
              onClick={handleConfirmDelete}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};