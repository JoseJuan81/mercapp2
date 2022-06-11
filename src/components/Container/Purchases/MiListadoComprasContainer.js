import React from 'react';
import { useSelector } from 'react-redux';
import { filter, prop } from 'ramda';
import { equality } from 'functionallibrary';

import { PaginaCompraOptimizada } from '../../../Pages/Purchases/PaginaCompraOptimizada';

export const MiListadoComprasContainer = () => {

    // ===== STORE =====
    const { loading } = useSelector( store => store.loading );
    const { cache: insumos } = useSelector( store => store.insumos );

    // VARIABLES LOCALES
    const insumosSelected = filter( equality( prop('selected'), true ), insumos );

    return (
        <div className="layout__page">
            <PaginaCompraOptimizada insumos={ insumosSelected } />
        </div>
    )
}
