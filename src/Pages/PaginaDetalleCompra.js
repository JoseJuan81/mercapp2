import { round } from 'functionallibrary';
import React from 'react';

import { getFormatDate } from '../helper/dates';
import { paretoOrdering } from '../helper/paretoOrdering';

const TWODECIMALS = round( 2 );

export const PaginaDetalleCompra = ({ details }) => {

    // ===== VARIABLES LOCALES =====
    const { closed, createdAt, establishmentName, insumos, name, total } = details;
    const insumosOrdered = paretoOrdering( insumos, { prop: 'total', total } );

    return (
        <div>
            {name && <h1>Nombre: { name }</h1>}
            {createdAt && <h1>fecha creacion: { getFormatDate( createdAt ) }</h1>}
            {establishmentName && <h1>comprado en: { establishmentName }</h1>}
            <h1>Insumos comprados: { insumos.length }</h1>
            <h1>gastado: S/. { total }</h1>
            <h1>estado de la compra: { closed ? 'Cerrada' : 'Abierta' }</h1>
            <InsumosList insumos={ insumosOrdered } />
        </div>
    )
}

const InsumosList = ({ insumos }) => {

    const tableClassRow = `
        grid grid-cols-5
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
            className="px-2"
        >
                <li
                    className={ tableClassRow }
                >
                    <span
                        className="
                            col-span-2
                            border-l border-solid border-warmGray-200
                        "
                    >Nombre</span>
                    <span
                        className="text-center"
                    >Precio</span>
                    <span
                        className="text-center"
                    >Cant.</span>
                    <span
                        className="text-center"
                    >Total</span>
                </li>
            {insumos.map((insumo, index) => (
                <li
                    key={ insumo.id + index }
                    className={ tableClassRow }
                >
                    <div
                        className={`
                            ${ classCell }
                            col-span-2
                            justify-start
                        `}
                    >{ insumo.name }</div>
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
                    >{ insumo.quantity }</div>
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
                            col-span-2
                        `}
                    >
                        <span>peso: </span>
                        <span>{ insumo.weight }%</span>
                    </div>
                    <div
                        className={`
                            ${ classCell }
                            justify-center
                            col-span-3
                        `}
                    >
                        <span>acumulado: </span>
                        <span>{ insumo.weightAcc }%</span>
                    </div>
                </li>
            ))}
        </ul>
    )
}
