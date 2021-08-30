import React from 'react';

import { PaginaNuevaCompra } from '../../Pages/PaginaNuevaCompra';
import { NuevaCompraMenuMobile } from '../menu/NuevaCompraMenuMobile';

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
