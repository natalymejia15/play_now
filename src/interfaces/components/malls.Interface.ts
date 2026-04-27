export type MallsProps = {
  values: { nombreCentro: string; ciudad: string; direccionMall: string; telefono: string };
  onChange: (field: string, value: string) => void;
  disabled?: boolean;
};