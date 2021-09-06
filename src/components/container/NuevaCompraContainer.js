import React from 'react';

import { PaginaNuevaCompra } from '../../pages/PaginaNuevaCompra';
import { NuevaCompraMenuMobile } from '../Menus/NuevaCompraMenuMobile';

export const NuevaCompraContainer = () => {
    return (
        <div
            className="layout__page"
        >
            <PaginaNuevaCompra />

            <NuevaCompraMenuMobile />
        </div>
    )
}
