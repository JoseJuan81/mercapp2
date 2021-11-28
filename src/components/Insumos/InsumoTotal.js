import React from 'react'

export const InsumoTotal = React.memo( ({ total }) => {

    return (
        <dt
            className="
                text-lg text-warmGray-600
                font-medium
                flex items-baseline
                pr-1
            "
        >
            <small className="text-sm mr-2">=</small>
            <span className="w-12 text-right">{ total }</span>
        </dt>
    )
})
