import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useLogin } from "@/modules";
import { AdminLayout, Button, ChangePasswordForm, ClientLayout, ProfileForm, SuperAdminLayout } from "@/components";
import { useUserRole } from "@/hook/users/use-user-role";

export const ProfilePage = () => {
  const { user, loading: authLoading, initializing } = useLogin();
  const { role, isLoading: roleLoading } = useUserRole();
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !initializing && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  const content = (
    <div className="max-w-4xl mx-auto mt-6 space-y-6">
      <div className="flex justify-start gap-4 mb-2">
        <Button
          variant={activeTab === "profile" ? "default" : "outline"}
          className={`px-6 py-3 text-lg rounded-xl ${
            activeTab === "profile"
              ? "bg-green-600 text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Perfil
        </Button>
        <Button
          variant={activeTab === "password" ? "default" : "outline"}
          className={`px-6 py-3 text-lg rounded-xl ${
            activeTab === "password"
              ? "bg-green-600 text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("password")}
        >
          Cambiar contraseña
        </Button>
      </div>

      {activeTab === "profile" ? (
        <ProfileForm userId={user?.id} />
      ) : (
        <ChangePasswordForm />
      )}
    </div>
  );

  if (role === "superAdmin") return <SuperAdminLayout>{content}</SuperAdminLayout>;
  if (role === "admin") return <AdminLayout>{content}</AdminLayout>;
  return <ClientLayout>{content}</ClientLayout>;
};

