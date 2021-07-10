import { setNewProperty } from 'functionallibrary';
import React, { useContext } from 'react';
import { InsumoContext } from '../../context/InsumoContext';
import { Insumo } from './Insumo';

export const ListadoInsumos = React.memo( () => {
    console.log('listadoInsumo')

    const { insumos, toogleCheck } = useContext( InsumoContext );

    const handleClickOnInsumo = (insumo) => {

        toogleCheck(
            setNewProperty('checked', !insumo.checked, insumo)
        );
    }

    return (
        <ul className="">
            {
                insumos && insumos.length > 0
                ? insumos.map((i, index) => (

                    <li
                        className="mb-3"
                        key={ `${i.title}-${index}-${Math.random}`}
                        onClick={ () => handleClickOnInsumo(i) }
                    >
                        <Insumo
                            { ...i }
                        />
                    </li>

                ))
                : <h1
                    className="font-bold text-2xl text-center text-warmGray-500"
                >Debe agregrar insumos :)</h1>
            }
        </ul>
    )
})
