import React, { useContext } from 'react';

import { InsumoContext } from '../../context/Insumo/InsumoContext';
import { Insumo } from './Insumo';

export const ListadoInsumos = () => {
    // console.log('5 LISTADO INSUMOS');

    const { insumos } = useContext( InsumoContext );

    if ( !insumos || insumos.length === 0 ) {
        return (
            <h1
                className="font-bold text-2xl text-center text-warmGray-500"
            >
                Debe agregrar insumos :)
            </h1>
        )
    }

    return (
        <ul className="">
            {
                insumos.map((i, index) => (

                    <li
                        className="mb-3"
                        key={ `${i.title}-${index}-${Math.random}`}
                    >
                        <Insumo
                            insumo={ i }
                        />
                    </li>

                ))
            }
        </ul>
    )
}
