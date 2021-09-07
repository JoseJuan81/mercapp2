import React from 'react';

import { PaginaResumenCompras } from '../../Pages/PaginaResumenCompras.js';
import { ResumenMenuMobile } from '../Menus/ResumenMenuMobile.js';

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