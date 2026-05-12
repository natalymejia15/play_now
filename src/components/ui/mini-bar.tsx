import type { PropsMiniBar } from "@/interfaces";

export const MiniBar = ({
  pct,
  color,
}: PropsMiniBar) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <div
        style={{
          flex: 1,
          height: 6,
          background:
            "var(--color-background-secondary)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color,
          }}
        />
      </div>

      <span
        style={{
          fontSize: 11,
          minWidth: 28,
        }}
      >
        {pct}%
      </span>
    </div>
  );
};