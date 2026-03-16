import { AdminInfoSection, Button, Dialog, DialogContent, DialogHeader, DialogTitle, MallInfoSection, ScrollArea } from "@/components";
import { Loader2 } from "lucide-react";
import type { EditMallDialogProps } from "../interfaces";
import { useEditMall } from "../hooks";

export const EditMallDialog = ({ open, onOpenChange, mall, onSuccess }: EditMallDialogProps) => {
  const { handleChange, handleSubmit, isLoading, form } = useEditMall({ open, onOpenChange, mall, onSuccess });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl shadow-xl border border-green-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-green-900">
            Editar Centro Comercial
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <MallInfoSection values={form} onChange={handleChange} disabled={isLoading} />
            <AdminInfoSection values={form} onChange={handleChange} disabled={isLoading} />
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Guardando...</> : "Guardar Cambios"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};