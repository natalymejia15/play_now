import { toast } from "@/lib";

export const handleToggleDeport = async (id: string, checked: boolean) => {
  try {
    //await updateDeportStatus(id, checked); 

    toast({
      title: "Actualizado",
      description: "Estado actualizado correctamente",
      variant: "success",
    });
  } catch {
    toast({
      title: "Error",
      description: "No se pudo actualizar el estado",
      variant: "destructive",
    });
  }
};