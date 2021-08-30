import { isEmpty } from 'functionallibrary';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { nuevoInsumoPath } from '../../constant/routes';

import { startLoadingInsumos } from '../../actions/insumosAction';

import { PaginaInsumos } from '../../Pages/PaginaInsumos'
import { BigAddButton } from '../genericos/buttons/BigAddButton';
import { InsumosMenuMobile } from '../menu/InsumosMenuMobile';

export const MisInsumosContainer = () => {

    const dispatch = useDispatch();

    const { insumos } = useSelector( state => state );

    useEffect( () => {

        dispatch( startLoadingInsumos() );

    }, []);

    return (
        <div
            className="layout__page"
        >
            {isEmpty( insumos ) ? (

                <div
                    className="
                        flex items-center justify-center
                        h-full w-full
                        overflow-scroll
                    "
                >
                    <BigAddButton
                        to={ nuevoInsumoPath }
                        title="Nuevo insumo"
                    />
                </div>

            ) : (
                <PaginaInsumos
                    insumos={ insumos }
                />
            )}

            <InsumosMenuMobile
                toogleShowSearch={ () => {} }
                toogleShowFilter={ () => {} }
                openModal={ () => {} }
            />
        </div>
    )
}
