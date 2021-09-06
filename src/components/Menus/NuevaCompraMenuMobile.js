import React from 'react';
import { NavLink } from 'react-router-dom';

import { resumenDeComprasPath } from '../../constant/routes';

export const NuevaCompraMenuMobile = () => {
    return (
        <div
            className="
                menu_mobile__container
                grid-cols-3
            "
        >

            <NavLink
                to={ resumenDeComprasPath }
                className="
                    icon-circle-left
                    btn-icon
                    flex items-center justify-center
                "
                title="atras"
            ></NavLink>

            <button
                type="button"
                className="
                    icon-cancel-circle
                    btn-icon
                    flex items-center justify-center
                "
            ></button>

            <button
                type="button"
                className="icon-checkmark btn-icon"
                title="Agregar"
            ></button>

        </div>
    )
}
