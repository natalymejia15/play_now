import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "../../hook/use-toast";
import { Loader2, User } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | null;
  onSuccess: () => void;
}

export const EditMallDialog = ({ open, onOpenChange, userId, onSuccess }: EditUserDialogProps) => {
  const [tipoDocumento, setTipoDocumento] = useState("cedula");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [celular, setCelular] = useState("");
  const [direccionAdmin, setDireccionAdmin] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open && userId) {
      loadUserData();
    }
  }, [open, userId]);

  const loadUserData = async () => {
   /* if (!userId) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;

      if (data) {
        setTipoDocumento(data.document_type || "cedula");
        setNumeroDocumento(data.document_number || "");
        setPrimerNombre(data.first_name || "");
        setSegundoNombre(data.segundo_nombre || "");
        setPrimerApellido(data.last_name || "");
        setSegundoApellido(data.segundo_apellido || "");
        setCelular(data.phone_number || "");
        setDireccionAdmin(data.address || "");
      }
    } catch (error: any) {
      console.error("Error loading user data:", error);
      toast({
        title: "Error",
        description: "No se pudo cargar la información del usuario",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }*/
  };

  const handleSubmit = async (e: React.FormEvent) => {
   /* e.preventDefault();
    if (!userId) return;
    
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          document_type: tipoDocumento as any,
          document_number: numeroDocumento,
          first_name: primerNombre,
          segundo_nombre: segundoNombre,
          last_name: primerApellido,
          segundo_apellido: segundoApellido,
          phone_number: celular,
          address: direccionAdmin,
        })
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: "Usuario actualizado",
        description: "La información del usuario ha sido actualizada exitosamente",
      });

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: error.message || "No se pudo actualizar el usuario",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }*/
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Editar Administrador</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-8rem)] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Información del Administrador</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoDocumento">Tipo de Documento *</Label>
                  <Select value={tipoDocumento} onValueChange={setTipoDocumento} disabled={isLoading}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cedula">Cédula de Ciudadanía</SelectItem>
                      <SelectItem value="nit">NIT</SelectItem>
                      <SelectItem value="pasaporte">Pasaporte</SelectItem>
                      <SelectItem value="tarjeta_identidad">Tarjeta de Identidad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="numeroDocumento">Número de Documento *</Label>
                  <Input
                    id="numeroDocumento"
                    value={numeroDocumento}
                    onChange={(e) => setNumeroDocumento(e.target.value)}
                    placeholder="1002003004"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="primerNombre">Primer Nombre *</Label>
                  <Input
                    id="primerNombre"
                    value={primerNombre}
                    onChange={(e) => setPrimerNombre(e.target.value)}
                    placeholder="Laura"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="segundoNombre">Segundo Nombre</Label>
                  <Input
                    id="segundoNombre"
                    value={segundoNombre}
                    onChange={(e) => setSegundoNombre(e.target.value)}
                    placeholder="Marcela"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="primerApellido">Primer Apellido *</Label>
                  <Input
                    id="primerApellido"
                    value={primerApellido}
                    onChange={(e) => setPrimerApellido(e.target.value)}
                    placeholder="López"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="segundoApellido">Segundo Apellido</Label>
                  <Input
                    id="segundoApellido"
                    value={segundoApellido}
                    onChange={(e) => setSegundoApellido(e.target.value)}
                    placeholder="Gómez"
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="celular">Celular *</Label>
                  <Input
                    id="celular"
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                    placeholder="3001112233"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="direccionAdmin">Dirección *</Label>
                  <Input
                    id="direccionAdmin"
                    value={direccionAdmin}
                    onChange={(e) => setDireccionAdmin(e.target.value)}
                    placeholder="Calle 12 #34-56"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  "Guardar Cambios"
                )}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};