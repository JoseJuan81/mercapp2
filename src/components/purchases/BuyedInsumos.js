import React from 'react';

export const BuyedInsumos = React.memo(({ insumos, inline = false, selected }) => {
    const len = insumos.length;

    return (
        <div
            className={`
                flex ${ inline ? 'flex-row items-baseline' : 'flex-col' }
                ${ selected ? 'text-warmGray-800' : 'text-warmGray-500' } text-sm
            `}
        >
            <span
                className="
                    text-xl font-light
                    mr-1
                "
            >
                { len }
            </span>
            <span
                className="
                    text-xs
                "
            >{ len === 1 ? 'insumo' : 'insumos' }</span>
        </div>
    )
})
