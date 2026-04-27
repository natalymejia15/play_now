import type { ICourts } from "@/modules";


export interface CourtListProps {
  courts: ICourts[];
  mallName: string;
  isLoading: boolean;
  onBack: () => void;
  onSelectCourt: (court: ICourts) => void;
}

export interface CourtCardProps {
  court: ICourts;
  onSelect: (court: ICourts) => void;
}