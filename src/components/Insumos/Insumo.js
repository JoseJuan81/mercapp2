import React from 'react';

const InsumoEtiquetas = ({ labels, checked }) => {
    return (
        <ul className="flex flex-wrap mt-2">

            {
                labels.map(la => (
                    <li
                        className={`
                            ${checked ? 'bg-lime-100' : 'bg-white'} rounded-md
                            text-xs ${checked ? 'text-lime-700' : 'text-warmGray-800'}
                            mr-1 mb-1 p-1
                        `}
                    >{ la }</li>
                ))
            }

        </ul>
    )
}

export const Insumo = ({ title, price, currency, labels, checked }) => {

    return (
        <div
            className={`
                duration-200
                rounded-lg ${checked ? 'shadow-xl' : 'shadow-md'}
                border border-solid ${checked ? 'border-lime-400' : 'border-warmGray-100'}
            `}
        >

            <dl className="flex flex-auto p-2 mb-2">

                <div className="flex flex-auto">
                    <dt
                        className={`
                            duration-200
                            flex-auto
                            text-2xl font-bold ${checked ? 'text-warmGray-600' : 'text-warmGray-400'}
                        `}
                    >
                        { title }
                    </dt>

                    <dt
                        className={`
                            text-2xl ${checked ? 'text-lime-600' : 'text-warmGray-400'}
                            ${checked && 'font-semibold'}
                        `}
                    >
                        <small
                            className="text-xs font-light"
                        >
                            { currency }
                        </small>
                        <span>{ price }</span>
                    </dt>
                </div>

                <div className="ml-4">...</div>

            </dl>

            <div
                className="
                    rounded-br-lg rounded-bl-lg
                    bg-warmGray-50
                    px-2 py-2
                "
            >
                <InsumoEtiquetas
                    labels={ labels }
                    checked={ checked }
                />
            </div>
            
        </div>
    )
}
