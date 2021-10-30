import React from 'react';

export const InsumoEtiquetas = React.memo( ({ labels, checked }) => {

    return (
        <ul className="flex flex-wrap">

            {
                labels.map((la, i) => (
                    <li
                        key={`${la}-${i}-${Math.random}`}
                        className={`
                            bg-white
                            text-xs ${ checked ? 'text-lime-700' : 'text-warmGray-800' }
                            m-1 p-1
                        `}
                    >{ la }</li>
                ))
            }

        </ul>
    )
})