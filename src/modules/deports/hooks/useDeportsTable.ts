
import { useState } from "react";
import type { IDeport } from "../interfaces";
import { useNavigate } from "react-router-dom";

export const useDeportsTable = (
    deports: IDeport[],
    deleteDeport: (id: number) => Promise<void>
) => {
    const [deportToEdit, setDeportToEdit] = useState<IDeport | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [deportToDelete, setDeportToDelete] = useState<IDeport | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const navigate = useNavigate();

    const handleEdit = (deport: IDeport) => {
        setDeportToEdit(deport);
        setIsEditDialogOpen(true);
    };

    const handleDeleteClick = (deport: IDeport) => {
        setDeportToDelete(deport);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (deportToDelete?.id !== undefined && deportToDelete?.id !== null) { 
            await deleteDeport(deportToDelete.id);
            setIsDeleteDialogOpen(false);
        }
    };

    const handleViewDeport = (deportId?: number) => {
        if (!deportId) return;
        navigate(`/super-admin/deport/${deportId}`);
    };

    return {
        deportToEdit,
        isEditDialogOpen,
        setIsEditDialogOpen,
        deportToDelete,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        handleEdit,
        handleDeleteClick,
        handleConfirmDelete,
        handleViewDeport,
        deports
    };
};