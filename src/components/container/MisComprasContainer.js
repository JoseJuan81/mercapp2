import React from 'react';

import { PaginaResumenCompras } from '../../Pages/PaginaResumenCompras';
import { ResumenMenuMobile } from '../Menu/ResumenMenuMobile';

export const MisComprasContainer = () => {
    return (
        <div
            className="layout__page"
        >
            <PaginaResumenCompras />

            <ResumenMenuMobile />
        </div>
    )
}
