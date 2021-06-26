import React from 'react';
import { Insumo } from './Insumo';

export const ListadoInsumos = ({ insumosState, handleClickOnInsumo }) => {
    return (
        <ul className="">
            {
                insumosState.map((i, index) => (

                    <li
                        className="mb-3"
                        onClick={ () => handleClickOnInsumo(i) }
                    >
                        <Insumo
                            key={ `${i.title}-${index}`}
                            { ...i }
                        />
                    </li>

                ))
            }
        </ul>
    )
}
