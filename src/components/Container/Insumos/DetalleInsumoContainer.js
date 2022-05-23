import React from 'react';
import { useSelector } from 'react-redux';

import { PaginaDetalleInsumo } from '../../../Pages/Insumos/PaginaDetalleInsumo';
import { PaginaLoadingDetalleInsumo } from '../../../Pages/loading/PaginaLoadingDetalleInsumo';

import { DetalleInsumoMenuMobile } from '../../Menus/DetalleInsumoMenuMobile';

export const DetalleInsumoContainer = () => {

    // ===== STORE =====
    const { loading } = useSelector( store => store.loading );
    
    return (
        <div>
            {loading
            ? <PaginaLoadingDetalleInsumo />
            : <PaginaDetalleInsumo />}

            <DetalleInsumoMenuMobile />
        </div>
    )
}
