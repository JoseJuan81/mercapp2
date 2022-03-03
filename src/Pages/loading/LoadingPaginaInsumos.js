import React from 'react';

export const LoadingPaginaInsumos = () => {

    const pulseClass = `
        animate-pulse
        rounded
        bg-gray-200
    `
    return (
        <div className="px-2 pt-4" >
            <ul>
                {new Array(7).fill(1).map((i, index) => (
                    <li
                        key={index}
                        className={`
                            border border-solid border-warmGray-300 rounded-lg
                            mb-3
                        `}
                    >
                        <div className="flex items-center justify-between p-2">
                            <div data-name="insumo name" className={ pulseClass + 'w-full h-6 mr-2' }></div>
                            <div datat-name="insumo buttons" className="flex">
                                <div className={ pulseClass + 'rounded-full w-6 h-6 m-2' }></div>
                                <div className={ pulseClass + 'rounded-full w-6 h-6 my-2' }></div>
                            </div>
                        </div>
                        <div
                            data-name="insumo etiquetas"
                            className="
                                bg-warmGray-100
                                w-full h-6
                            "
                        >
                            
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
