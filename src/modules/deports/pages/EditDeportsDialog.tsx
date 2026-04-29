import { Button, DeportsInfoSection, Dialog, DialogContent, DialogHeader, DialogTitle, ScrollArea } from "@/components";
import type { EditDeportsDialogProps } from "../interfaces";
import { useEditDeports } from "../hooks";
import { Loader2 } from "lucide-react";


export const EditDeportsDialog = ({ open, onOpenChange, deport }: EditDeportsDialogProps) => {
    const { isLoading, form, handleChange, handleSubmit } = useEditDeports({ open, onOpenChange, deport });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl border border-green-100">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-green-900">
                        Editar Deporte
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <DeportsInfoSection values={form} onChange={handleChange} disabled={isLoading} />
                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creando...</> : "Guardar Cambios"}
                            </Button>
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};