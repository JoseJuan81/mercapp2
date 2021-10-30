import React from 'react'

export const InsumoTitle = React.memo( ({ title, checked }) => {

    return (
        <dt
            className={`
                duration-200
                flex-auto
                text-2xl font-medium ${checked ? 'text-lime-500' : 'text-warmGray-800'}
                pr-6
            `}
        >
            { title }
        </dt>
    )
})
