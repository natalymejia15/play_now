import { useState } from "react";
import { Search, MapPin, Users, DollarSign } from "lucide-react";
import { ClientLayout } from "../../components/layouts/ClientLayout";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";


const mockMalls = [
  { id: "1", nombre_centro: "Centro Comercial Santa Fe", ciudad: "Bogotá" },
  { id: "2", nombre_centro: "Unicentro", ciudad: "Bogotá" },
  { id: "3", nombre_centro: "Andino", ciudad: "Bogotá" },
];

const mockCourts = {
  "1": [
    { id: "c1", name: "Cancha Fútbol 5", capacity: 10, price: 80000, image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=500" },
    { id: "c2", name: "Cancha Fútbol 7", capacity: 14, price: 120000, image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500" },
    { id: "c3", name: "Cancha Tenis", capacity: 4, price: 60000, image: "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=500" },
  ],
  "2": [
    { id: "c4", name: "Cancha Baloncesto", capacity: 10, price: 90000, image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500" },
    { id: "c5", name: "Cancha Fútbol 5", capacity: 10, price: 85000, image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=500" },
  ],
  "3": [
    { id: "c6", name: "Cancha Pádel", capacity: 4, price: 70000, image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=500" },
    { id: "c7", name: "Cancha Squash", capacity: 2, price: 50000, image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500" },
  ],
};

export default function ClientHome() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMall, setSelectedMall] = useState<string | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<any>(null);
  

  const filteredMalls = mockMalls.filter((mall) =>
    mall.nombre_centro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMallSelect = (mallId: string) => {
    setSelectedMall(mallId);
  };

  const handleCourtSelect = (court: any) => {
    setSelectedCourt(court);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de reserva
    setSelectedCourt(null);
  };

  return (
    <ClientLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Search Section */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Buscar Centros Comerciales</h1>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre del centro comercial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {!selectedMall && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMalls.map((mall) => (
              <Card
                key={mall.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleMallSelect(mall.id)}
              >
                <CardHeader>
                  <CardTitle>{mall.nombre_centro}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {mall.ciudad}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {/* Courts Grid */}
        {selectedMall && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setSelectedMall(null)}>
                ← Volver
              </Button>
              <h2 className="text-2xl font-bold">
                Canchas disponibles en {mockMalls.find((m) => m.id === selectedMall)?.nombre_centro}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCourts[selectedMall as keyof typeof mockCourts]?.map((court) => (
                <Card
                  key={court.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                  onClick={() => handleCourtSelect(court)}
                >
                  <img
                    src={court.image}
                    alt={court.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle>{court.name}</CardTitle>
                    <CardDescription className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Capacidad: {court.capacity} personas
                      </div>
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <DollarSign className="h-4 w-4" />
                        ${court.price.toLocaleString()} / hora
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Booking Form Card Overlay */}
        {selectedCourt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Card className="max-w-md w-full mx-4">
              <CardHeader>
                <CardTitle>Reservar {selectedCourt.name}</CardTitle>
                <CardDescription>
                  Complete el formulario para realizar su reserva
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha</Label>
                    <Input id="date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Hora</Label>
                    <Input id="time" type="time" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duración (horas)</Label>
                    <Input id="duration" type="number" min="1" max="4" defaultValue="1" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="players">Número de jugadores</Label>
                    <Input
                      id="players"
                      type="number"
                      min="1"
                      max={selectedCourt.capacity}
                      required
                    />
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total estimado:</span>
                      <span className="text-2xl font-bold text-primary">
                        ${selectedCourt.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => setSelectedCourt(null)} className="flex-1">
                      Cancelar
                    </Button>
                    <Button type="submit" className="flex-1">
                      Confirmar Reserva
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
