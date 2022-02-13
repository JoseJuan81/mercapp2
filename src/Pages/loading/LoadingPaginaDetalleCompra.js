import React from 'react';

export const LoadingPaginaDetalleCompra = () => {

    const pulseClass = `
        animate-pulse
        w-full
        rounded
        bg-gray-200
    `
    return (
        <div className="px-2 pt-4" >
            <div className={ pulseClass + 'h-6 mb-4' }></div>
            <div className={ pulseClass + 'h-6 mb-4' }></div>
            <ul className="border border-solid border-warmGray-400">
                {new Array(7).fill(1).map((i, index) => (
                    <li
                        key={index}
                        className={`
                            border-b border-solid border-warmGray-300
                            p-2
                            flex items-center
                        `}
                    >
                        <div className={ pulseClass + 'h-4 my-2' }></div>
                        <div className={ pulseClass + 'h-4 m-2' }></div>
                        <div className={ pulseClass + 'h-4 my-2' }></div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
