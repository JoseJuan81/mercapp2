import React from 'react';
import { useSelector } from 'react-redux';

export const MiListadoComprasContainer = () => {

    // ===== STORE =====
    const { loading } = useSelector( store => store.loading );

    return (
        <div className="layout__page">
            Listado de compras
            Menu mobile
        </div>
    )
}
