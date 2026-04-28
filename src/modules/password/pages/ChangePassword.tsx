import { Loader2, Key } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useChangePassword } from "../hooks";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, ScrollArea } from "@/components";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "La contraseña actual es requerida"),
    newPassword: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof changePasswordSchema>;

export const ChangePasswordForm = () => {
  const { changePassword, isLoading } = useChangePassword();

  const form = useForm<FormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: FormData) => {
    await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    form.reset();
  };

  return (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Key className="h-6 w-6 text-green-600" />
          Cambiar Contraseña
        </CardTitle>
        <CardDescription className="text-gray-600">
          Actualiza tu contraseña de acceso
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea className="max-h-[60vh] pr-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: "currentPassword", label: "Contraseña Actual" },
                { id: "newPassword", label: "Nueva Contraseña" },
                { id: "confirmPassword", label: "Confirmar Contraseña" },
              ].map((field) => (
                <div className="space-y-2" key={field.id}>
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <Input
                    id={field.id}
                    type="password"
                    placeholder="********"
                    {...form.register(field.id as keyof FormData)}
                  />
                  {form.formState.errors[field.id as keyof FormData] && (
                    <p className="text-sm text-destructive">
                      {
                        form.formState.errors[field.id as keyof FormData]
                          ?.message
                      }
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Cambiar Contraseña
              </Button>
            </div>
          </form>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};