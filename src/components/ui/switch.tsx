import * as React from "react";
import { cn } from "@/lib";

type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
};

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked, onCheckedChange, className }, ref) => {
    const [internal, setInternal] = React.useState<boolean>(
      checked ?? defaultChecked ?? false,
    );

    React.useEffect(() => {
      if (typeof checked === "boolean") setInternal(checked);
    }, [checked]);

    const toggle = () => {
      const next = !internal;
      setInternal(next);
      onCheckedChange?.(next);
    };

    return (
      <button
        ref={ref}
        role="switch"
        aria-checked={internal}
        onClick={toggle}
        type="button"
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary/40",
          internal
            ? "bg-primary"
            : "bg-border",
          className,
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200",
            internal ? "translate-x-5" : "translate-x-1",
          )}
        />
      </button>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
