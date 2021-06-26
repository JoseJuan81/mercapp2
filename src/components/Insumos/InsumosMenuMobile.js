import React from 'react';

export const InsumosMenuMobile = ({ selectAll, unSelectAll, toogleShowSearch }) => {
    return (
        <div
            className="
                grid grid-cols-4
                fixed bottom-0 left-0
                w-full h-16
                bg-lime-50
                border-t border-solid border-lime-300
            "
        >
            
            <button
                className="icon-checkmark text-lime-400 text-3xl"
                title="Seleccionar todo"
                onClick={ selectAll }
            ></button>

            <button
                className="
                    icon-checkmark
                    text-3xl text-warmGray-300
                    border-l border-r border-solid border-lime-300
                "
                title="Deseleccionar todo"
                onClick={ unSelectAll }
                ></button>

            <button
                className="icon-search text-3xl text-rose-500"
                title="Buscar"
                onClick={ toogleShowSearch }
            ></button>

            <button
                className="
                    icon-plus
                    text-3xl text-lime-600
                    border-l border-solid border-lime-300
                "
                title="Agregar"
            ></button>

        </div>
    )
}
