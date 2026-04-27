import { useState, useMemo } from "react";
import { useCourts, useMallReservation, type ICourts, type IMall, } from "@/modules";

export const useClientHome = () => {
  const { malls, isLoading: loadingMalls } = useMallReservation();
  const { courts, isLoading: loadingCourts, fetchCourtsByMall } = useCourts();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMall, setSelectedMall] = useState<IMall | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<ICourts | null>(null);

  const mallList: IMall[] = Array.isArray(malls) ? malls : [];

  const filteredMalls = useMemo(() => {
    return mallList.filter((mall) =>
      mall.nombreCentro.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [mallList, searchTerm]);

  const handleMallSelect = (mallId: string) => {
    const mall = mallList.find((m) => m.id === Number(mallId)) ?? null;
    setSelectedMall(mall);
    fetchCourtsByMall(mallId);
  };

  const handleBackToMalls = () => {
    setSelectedMall(null);
  };

  const handleSelectCourt = (court: ICourts) => {
    setSelectedCourt(court);
  };

  const handleCloseReservation = () => {
    setSelectedCourt(null);
  };

  return {
    searchTerm,
    selectedMall,
    selectedCourt,
    filteredMalls,
    courts,
    loadingMalls,
    loadingCourts,
    setSearchTerm,
    handleMallSelect,
    handleBackToMalls,
    handleSelectCourt,
    handleCloseReservation,
  };
};