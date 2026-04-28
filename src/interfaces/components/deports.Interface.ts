export type DeportsProps = {
    values: { nombre: string; descripcion: string; cantidad: number };
    onChange: (field: string, value: string) => void;
    disabled?: boolean;
};