import React from 'react';

import { PaginaResumenCompras } from '../../Pages/PaginaResumenCompras.js';
import { MisComprasMenuMobile } from '../Menus/MisComprasMenuMobile.js';

export const MisComprasContainer = () => {
    return (
        <div
            className="layout__page"
        >
            <PaginaResumenCompras />

            <MisComprasMenuMobile />
        </div>
    )
}
