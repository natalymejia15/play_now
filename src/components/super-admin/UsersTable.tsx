import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useCreateMall } from "../../hook/use-mall";


export const UsersTable = () => {
  const { malls, fetchMalls, fetching } = useCreateMall();
  const [localMalls, setLocalMalls] = useState(malls);

  useEffect(() => {
    setLocalMalls(malls);
  }, [malls]);

  useEffect(() => {
    fetchMalls();
  }, []);


  if (fetching) return <div>Cargando centros comerciales...</div>;

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre del Centro</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Ciudad</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {malls.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No hay centros comerciales registrados
              </TableCell>
            </TableRow>
          ) : (
            malls.map((mall) => (
              <TableRow key={mall.nombreCentro}>
                <TableCell>{mall.nombreCentro}</TableCell>
                <TableCell>{mall.direccion}</TableCell>
                <TableCell>{mall.telefono}</TableCell>
                <TableCell>{mall.ciudad}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};