import React from 'react';
import { NavLink } from 'react-router-dom';
import { nuevoInsumoPath } from '../../constant/routes';

export const InsumosMenuMobile = React.memo(({ toogleShowSearch, toogleShowFilter, openModal }) => {
    console.log('6 MENU MOVIL');

    const dispatch = () => {};
    
    return (
        <div
            className="
                menu_mobile__container
                grid-cols-5
            "
        >
            
            <button
                className="icon-checkmark btn-icon"
                title="Seleccionar todo"
                onClick={ () => dispatch({ type: 'select-all' }) }
            ></button>

            <button
                className="icon-checkmark btn-icon text-warmGray-300"
                title="Deseleccionar todo"
                onClick={ () => dispatch({ type: 'unselect-all' }) }
                ></button>

            <button
                className="icon-search btn-icon"
                title="Buscar"
                onClick={ toogleShowSearch }
            ></button>

            <button
                className="icon-filter btn-icon"
                title="Filtrar"
                onClick={ toogleShowFilter }
            ></button>

            <NavLink
                to={ nuevoInsumoPath }
                className="
                    icon-plus
                    btn-icon
                    flex items-center justify-center
                "
            ></NavLink>

        </div>
    )
})
