import React from 'react';
import { NavLink } from 'react-router-dom';
import { nuevaCompraPath } from '../../constant/routes';

export const ResumenMenuMobile = () => {
    return (
        <div
            className="
                menu_mobile__container
                grid-cols-3
            "
        >

            <button
                className="icon-search btn-icon"
                title="Buscar"
            ></button>

            <button
                className="icon-filter btn-icon"
                title="Filtrar"
            ></button>

            <NavLink
                to={ nuevaCompraPath }
                className="
                    icon-plus
                    btn-icon
                    flex items-center justify-center
                "
                title="Agregar"
            ></NavLink>

        </div>
    )
}
