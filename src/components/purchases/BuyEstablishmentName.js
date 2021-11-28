import React from 'react';

export const BuyEstablishmentName = React.memo(({ selected, name }) => {
    return (
        <h3
            className={`
                ${ selected ? 'bg-lime-100' : 'bg-warmGray-200' }
                px-2
                text-warmGray-500 text-sm font-bold
            `}
        >{ name }</h3>
    )
})
