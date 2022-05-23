import React from 'react';
import { useSelector } from 'react-redux';

import { PaginaLoadingCompras } from '../../../Pages/loading/PaginaLoadingCompras.js';
import { PaginaResumenCompras } from '../../../Pages/Purchases/PaginaResumenCompras.js';

import { MisComprasMenuMobile } from '../../Menus/MisComprasMenuMobile.js';

export const MisComprasContainer = () => {

    // ===== STORE =====
    const { loading } = useSelector( store => store.loading );

    return (
        <div className="layout__page">

            {loading
            ? <PaginaLoadingCompras />
            : <PaginaResumenCompras />}

            <MisComprasMenuMobile />
        </div>
    )
}
