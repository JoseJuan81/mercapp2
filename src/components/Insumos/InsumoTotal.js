import React from 'react'

export const InsumoTotal = React.memo( ({ total }) => {

    return (
        <dt
            className="
                text-2xl text-warmGray-500
                font-medium
                flex items-baseline
            "
        >
            <small className="text-sm mr-2">=</small>
            <span className="w-12 text-right">{ total }</span>
        </dt>
    )
})
