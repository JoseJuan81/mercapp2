import { round } from 'functionallibrary';
import React from 'react';

import { extractInsumos } from '../../helper/extractAndOrderInsumos';
import { paretoOrdering } from '../../helper/paretoOrdering';

const TWODECIMALS = round( 2 );

export const InsumosBuyedList = ({ purchases, total }) => {

    const insumos = extractInsumos( purchases );
    const insumosOrdered = paretoOrdering( insumos, { prop: 'total', total } );

    const tableClassRow = `
        grid grid-cols-6
        items-center justify-center
        border-b border-solid border-warmGray-200
    `;
    const classCell = `
        h-full
        flex items-center
        px-1 py-2
    `;

    return (
        <ul
            className="
                animate__animated animate__fadeInLeftBig
            "
        >
            <li
                className={`
                    ${ tableClassRow }
                    font-bold text-lime-500
                    bg-lime-50
                    py-2
                    sticky -top-4
                `}
            >
                <span
                    className="
                        col-span-3
                        border-l border-solid border-warmGray-200
                    "
                >Nombre</span>
                <span className="text-center" >Cant.</span>
                <span className="text-center">Precio</span>
                <span className="text-center">Total</span>
            </li>

            {insumosOrdered.map((insumo, index) => (
                <li
                    key={ insumo.id + index }
                    className={ tableClassRow }
                >
                    <div
                        className={`
                            ${ classCell }
                            col-span-3
                            justify-start
                            font-bold
                        `}
                    >{ insumo.name }</div>
                    <div
                        className={`
                            ${ classCell }
                            justify-center
                        `}
                    >{ insumo.quantity }</div>
                    <div
                        className={`
                            ${ classCell }
                            justify-center
                        `}
                    >{ TWODECIMALS( insumo.total / insumo.quantity ) }</div>
                    <div
                        className={`
                            ${ classCell }
                            justify-center
                        `}
                    >{ insumo.total }</div>
                    <div
                        className={`
                            ${ classCell }
                            justify-center
                            col-span-3
                            bg-warmGray-100
                            text-sm
                        `}
                    >
                        <span>peso: </span>
                        <span
                            className="
                                font-bold text
                                ml-2
                            "
                        >{ insumo.weight }%</span>
                    </div>
                    <div
                        className={`
                            ${ classCell }
                            justify-center
                            col-span-3
                            bg-warmGray-200
                            text-sm
                        `}
                    >
                        <span>acumulado: </span>
                        <span
                            className="
                                font-bold text
                                ml-2
                            "
                            >{ insumo.weightAcc }%</span>
                    </div>
                </li>
            ))}
        </ul>
    )
}
