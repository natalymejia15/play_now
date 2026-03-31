import { Button, CourtsInfoSection, Dialog, DialogContent, DialogHeader, DialogTitle, ScrollArea } from "@/components";
import { Loader2 } from "lucide-react";
import type { CreateCourtsDialogProps } from "../interfaces";
import { useCreateCourt } from "../hooks";


export const CreateCourtsDialog = ({ open, onOpenChange }: CreateCourtsDialogProps) => {
    const { isLoading, courtData, handleSubmit, handleChange } = useCreateCourt({ open, onOpenChange });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl border border-green-100">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-green-900">
                        Crear Nueva Cancha
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <CourtsInfoSection values={courtData} onChange={handleChange} disabled={isLoading} />
                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creando...</> : "Crear"}
                            </Button>
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};