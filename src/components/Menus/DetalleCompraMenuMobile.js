import React from 'react';

import { LockButton, LockButtonOpen, TrashButton } from '../Buttons/AppButtons';

export const DetalleCompraMenuMobile = ({ deleteAction, closingAction, purchaseClosed }) => {
    return (
        <div
            className="
                menu_mobile__container
                grid-cols-2
            "
        >

            {purchaseClosed
                ? <LockButtonOpen
                    isButton
                    onClick={ closingAction }
                />
                : <LockButton
                    isButton
                    onClick={ closingAction }
                />
            }

            <TrashButton
                isButton
                onClick={ deleteAction }
            />

        </div>
    )
}
