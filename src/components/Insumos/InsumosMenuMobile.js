import React, { useContext } from 'react';
import { InsumoContext } from '../../context/Insumo/InsumoContext';

export const InsumosMenuMobile = React.memo(({ toogleShowSearch, toogleShowFilter, openModal }) => {
    console.log('6 MENU MOVIL');

    const { dispatch } = useContext( InsumoContext );
    
    return (
        <div
            className="
                grid grid-cols-5
                fixed bottom-0 left-0
                w-full h-16
                bg-white
                border-t border-solid border-warmGray-300
                shadow-inner
            "
        >
            
            <button
                className="icon-checkmark text-lime-400 btn-icon"
                title="Seleccionar todo"
                onClick={ () => dispatch({ type: 'select-all' }) }
            ></button>

            <button
                className="icon-checkmark btn-icon text-warmGray-300"
                title="Deseleccionar todo"
                onClick={ () => dispatch({ type: 'unselect-all' }) }
                ></button>

            <button
                className="icon-search text-rose-500 btn-icon"
                title="Buscar"
                onClick={ toogleShowSearch }
            ></button>

            <button
                className="icon-filter text-blue-400 btn-icon"
                title="Filtrar"
                onClick={ toogleShowFilter }
            ></button>

            <button
                className="icon-plus btn-icon text-lime-600"
                title="Agregar"
                onClick={ openModal }
            ></button>

        </div>
    )
})
