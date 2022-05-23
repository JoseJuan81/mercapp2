import React from 'react';

import { PaginaNuevoInsumo } from '../../../Pages/Insumos/PaginaNuevoInsumo';
import { PaginaLoadingPaginaNuevoInsumo } from '../../../Pages/loading/PaginaLoadingPaginaNuevoInsumo';

import { NuevoInsumoMenuMobile } from '../../Menus/NuevoInsumoMenuMobile';

export const NuevoInsumoContainer = () => {

    return (
        <div className="layout__page">
            <PaginaNuevoInsumo />

            <NuevoInsumoMenuMobile />
        </div>
    )
}
