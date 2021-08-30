import React from 'react';

import { PaginaNuevaCompra } from '../../Pages/PaginaNuevaCompra';
import { NuevaCompraMenuMobile } from '../Menu/NuevaCompraMenuMobile';

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
