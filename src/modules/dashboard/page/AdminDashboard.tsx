import { AdminLayout, Card, CardContent, CardHeader, CardTitle } from "@/components"
import { ArrowUpRight, Building2, Calendar1 } from "lucide-react"
import { useAdminDashboard } from "../hooks";

export const AdminDashboard = () => {
    const { adminKpis } = useAdminDashboard();

    return (
        <AdminLayout>
            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-green-900">Dashboard</h1>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-blue-200 bg-blue-50 transition hover:shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700">
                                Total Canchas
                            </CardTitle>
                            <div className="rounded-full bg-blue-100 p-2">
                                <Building2 className="h-5 w-5 text-blue-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-blue-800">
                                {adminKpis?.totalCourts}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-green-200 bg-green-50 transition hover:shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-green-700">
                                Total Reservas al Día
                            </CardTitle>
                            <div className="rounded-full bg-green-100 p-2">
                                <Calendar1 className="h-5 w-5 text-green-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-800">
                                {adminKpis?.todayReservations}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-purple-200 bg-purple-50 transition hover:shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-purple-700">
                                Total Reservas al Mes
                            </CardTitle>
                            <div className="rounded-full bg-purple-100 p-2">
                                <ArrowUpRight className="h-5 w-5 text-purple-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-purple-800">
                                {adminKpis?.monthReservations}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-amber-200 bg-amber-50 transition hover:shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-amber-700">
                                Canchas Disponibles
                            </CardTitle>

                            <div className="rounded-full bg-amber-100 p-2">
                                <Building2 className="h-5 w-5 text-amber-600" />
                            </div>

                        </CardHeader>

                        <CardContent>
                            <div className="text-3xl font-bold text-amber-800">
                                {adminKpis?.availableCourtNow?.[0]?.count ?? 0}
                            </div>
                        </CardContent>

                    </Card>
                </div>

            </div>
        </AdminLayout>
    );
}