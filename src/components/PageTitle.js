import React from 'react';

export const PageTitle = React.memo(({ title }) => {
    return (
        <h1
            className="
                text-2xl font-light text-warmGray-800
                text-center
                mb-4
            "
        >{ title }</h1>
    )
})
