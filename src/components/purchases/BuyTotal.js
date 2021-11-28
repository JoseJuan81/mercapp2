import React from 'react';

export const BuyTotal = React.memo(({ total, selected }) => {
    return (
        <h1
            className={`
                ${ selected ? 'text-warmGray-800' : 'text-warmGray-500' } text-xl text-right
            `}
        >
            <span
                className="
                    text-sm
                    mr-1
                "
            >S/.</span>
            { total }
        </h1>
    )
})