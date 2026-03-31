import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ICourts } from "../interfaces";

const RELOAD_DELAY_MS = 800;

export const useCourtsTable = (
    court: ICourts[],
    deleteCourts: (id: number) => Promise<void>
) => {
    const [courtsToEdit, setCourtsToEdit] = useState<ICourts | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [courtsToDelete, setCourtsToDelete] = useState<ICourts | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const navigate = useNavigate();

    const handleEdit = (court: ICourts) => {
        setCourtsToEdit(court);
        setIsEditDialogOpen(true);
    };

    const handleDeleteClick = (court: ICourts) => {
        setCourtsToDelete(court);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (courtsToDelete?.id !== undefined && courtsToDelete?.id !== null) {
            await deleteCourts(courtsToDelete.id);
            setIsDeleteDialogOpen(false);
            setTimeout(() => {
                window.location.reload();
            }, RELOAD_DELAY_MS);
        }
    };

    const handleViewCourts = (courtId?: number) => {
        if (!courtId) return;
        navigate(`/admin/courts/details`, { state: { id: courtId } });
    };

    return {
        courtsToEdit,
        isEditDialogOpen,
        setIsEditDialogOpen,
        courtsToDelete,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        handleEdit,
        handleDeleteClick,
        handleConfirmDelete,
        handleViewCourts,
        court
    };
};