import React, { useContext } from 'react';
import { InsumoContext } from '../../context/InsumoContext';

export const InsumosMenuMobile = React.memo(({ toogleShowSearch, toogleShowFilter, openModal }) => {
    console.log('menu movil');

    const { selectingAllInsumos, unSelectingAllInsumos } = useContext( InsumoContext );
    
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
                className="icon-checkmark text-lime-400 text-3xl"
                title="Seleccionar todo"
                onClick={ selectingAllInsumos }
            ></button>

            <button
                className="
                    icon-checkmark
                    text-3xl text-warmGray-300
                "
                title="Deseleccionar todo"
                onClick={ unSelectingAllInsumos }
                ></button>

            <button
                className="icon-search text-3xl text-rose-500"
                title="Buscar"
                onClick={ toogleShowSearch }
            ></button>

            <button
                className="icon-filter text-3xl text-blue-400"
                title="Filtrar"
                onClick={ toogleShowFilter }
            ></button>

            <button
                className="
                    icon-plus
                    text-3xl text-lime-600
                "
                title="Agregar"
                onClick={ openModal }
            ></button>

        </div>
    )
})
