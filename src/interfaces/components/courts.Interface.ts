import type { CourtsFormData, CourtsFormValue } from "@/modules";

export type CourtsProps = {
    values: CourtsFormData,
    onChange: (field: keyof CourtsFormData, value: CourtsFormValue) => void;
    disabled?: boolean;
}