import React from 'react';

import { BigAddButton } from '../components/Buttons/BigAddButton';
import { nuevaCompraPath } from '../constant/routes';

export const PaginaResumenCompras = () => {
    return (
        <div
            className="
                flex items-center justify-center
                h-full w-full
                overflow-scroll
            "
        >
            <BigAddButton
                to={ nuevaCompraPath }
                title="Nueva compra"
            />
        </div>
    )
}
