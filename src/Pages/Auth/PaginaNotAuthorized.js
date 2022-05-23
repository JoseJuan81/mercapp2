import React from 'react';
import { NavLink } from 'react-router-dom';

import { resumenDeComprasPath } from '../../constant/routes';

export const PaginaNotAuthorized = () => {

    return (
        <div
            className="
                flex flex-col items-center justify-center
                w-full h-full
                text-6xl text-center font-bold text-warmGray-800
            "
        >
            <i className="fas fa-hand-paper mb-4"></i>
            <h1>No autorizado</h1>
            <NavLink
                to={ resumenDeComprasPath }
                className="
                    text-lime-500
                    mt-10
                "
            >
                <i className="fas fa-chevron-left"></i>
            </NavLink>
        </div>
    )
}
