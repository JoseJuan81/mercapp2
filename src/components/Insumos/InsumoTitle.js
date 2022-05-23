import React from 'react';

export const InsumoTitle = React.memo( ({ title, css = '' }) => {

    return (
        <h3
            className={ css }
        >
            { title }
        </h3>
    )
})
