import React from 'react'

export const InsumoTitle = React.memo( ({ title, checked }) => {

    return (
        <dt
            className={`
                duration-200
                text-md font-light ${checked ? 'text-lime-500' : 'text-warmGray-800'}
                mx-2 my-3
            `}
        >
            { title }
        </dt>
    )
})
