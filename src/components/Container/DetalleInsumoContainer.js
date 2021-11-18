import React from 'react';

import { PaginaDetalleInsumo } from '../../Pages/PaginaDetalleInsumo';
import { DetalleInsumoMenuMobile } from '../Menus/DetalleInsumoMenuMobile';

export const DetalleInsumoContainer = () => {
    return (
        <div>
            <PaginaDetalleInsumo />

            <DetalleInsumoMenuMobile />
        </div>
    )
}
