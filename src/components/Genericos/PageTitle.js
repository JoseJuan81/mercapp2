import React from 'react';

export const PageTitle = React.memo(({ title }) => {
    console.log('PageTitle');
    return (
        <h1
            className="
                text-4xl font-bold text-warmGray-500
                text-center
                mb-4
            "
        >{ title }</h1>
    )
})
