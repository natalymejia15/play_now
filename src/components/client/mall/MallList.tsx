import { Skeleton } from "@/components/ui";
import type { IMall } from "@/modules";
import { MallCard } from "./MallCard";

interface MallListProps {
  malls: IMall[];
  isLoading: boolean;
  onSelectMall: (mallId: string) => void;
}

export function MallList({ malls, isLoading, onSelectMall }: MallListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-40 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (malls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <p className="text-lg font-medium">No se encontraron centros comerciales.</p>
        <p className="text-sm mt-2">Intenta agregar uno nuevo o revisar los filtros.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {malls.map((mall) => (
        <MallCard key={mall.id} mall={mall} onSelect={onSelectMall} />
      ))}
    </div>
  );
}
