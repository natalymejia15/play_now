import type { PropsAvatar } from "@/interfaces";

export const Avatar = ({ initials }: PropsAvatar) => {
  return (
    <div
      className="
        flex h-10 w-10 items-center justify-center
        rounded-full
        bg-gradient-to-br
        from-green-500
        to-indigo-600
        text-xs font-semibold text-white
        shadow-sm
      "
    >
      {initials}
    </div>
  );
};