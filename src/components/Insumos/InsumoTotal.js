import React from 'react'

export const InsumoTotal = React.memo( ({ currency = 'PEN', total }) => {

    return (
        <dt
            className="
                text-2xl text-warmGray-500
                font-medium
                flex items-baseline
            "
        >
            <small className="text-xs font-light">total:</small>
            <small className="text-xs font-light mx-2">{ currency }</small>
            <span>{ total }</span>
        </dt>
    )
})
