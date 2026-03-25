import { useState } from "react";
import type { IMall } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { useMalls } from "./useMalls";

export const useMallsTable = () => {
  const { malls, fetching, deleteMall } = useMalls();
  const [mallToEdit, setMallToEdit] = useState<IMall | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [mallToDelete, setMallToDelete] = useState<IMall | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (mall: IMall) => {
    setMallToEdit(mall);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (mall: IMall) => {
    setMallToDelete(mall);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (mallToDelete?.id) {
      await deleteMall(mallToDelete.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleViewMall = (mallId?: number) => {
    if (!mallId) return;
    navigate(`/super-admin/mall/details`, { state: { id: mallId } });
  };

  return {
    malls,
    fetching,
    mallToEdit,
    isEditDialogOpen,
    setIsEditDialogOpen,
    mallToDelete,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleEdit,
    handleDeleteClick,
    handleConfirmDelete,
    handleViewMall,
  };
};