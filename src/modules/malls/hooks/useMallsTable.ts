import { useState } from "react";
import type { IMall } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { useMalls } from "./useMalls";

export const useMallsTable = () => {
    const { malls, fetching, deleteMall } = useMalls();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [mallToEdit, setMallToEdit] = useState<IMall | null>(null);
    const [mallToDelete, setMallToDelete] = useState<IMall | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [search, setSearch] = useState("");
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
        navigate(`/super-admin/mall/${mallId}`);
    };

    const filteredMalls = malls.filter((mall) =>
        mall.nombreCentro.toLowerCase().includes(search.toLowerCase())
    );

    const [visibleColumns, setVisibleColumns] = useState({
        direccion: true,
        telefono: false,
        ciudad: true,
        administrador: true,
        correo: true,
        celular: false,
    });


    return {
        deleteMall,
        malls,
        fetching,
        isEditDialogOpen,
        setIsEditDialogOpen,
        mallToEdit,
        setMallToEdit,
        handleEdit,
        handleDeleteClick,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        handleConfirmDelete,
        handleViewMall,
        mallToDelete,
        search,
        setSearch,
        filteredMalls,
        visibleColumns,
        setVisibleColumns
    }
}