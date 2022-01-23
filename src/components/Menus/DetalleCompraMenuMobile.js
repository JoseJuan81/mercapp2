import React from 'react';

import { TrashButton } from '../Buttons/AppButtons';

export const DetalleCompraMenuMobile = ({ deleteAction }) => {
    return (
        <div
            className="
                menu_mobile__container
                grid-cols-1
            "
        >

            <TrashButton
                isButton
                onClick={ deleteAction }
            />

        </div>
    )
}
