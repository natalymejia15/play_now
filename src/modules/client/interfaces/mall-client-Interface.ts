import type { IMall } from "@/modules";

export interface MallCardProps {
  mall: IMall;
  onSelect: (mallId: string) => void;
}

export interface MallListProps {
  malls: IMall[];
  isLoading: boolean;
  onSelectMall: (mallId: string) => void;
}
