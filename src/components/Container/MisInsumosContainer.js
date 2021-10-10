import { isEmpty } from 'functionallibrary';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { nuevoInsumoPath } from '../../constant/routes';

import { startLoadingInsumos } from '../../actions/insumosAction';

import { PaginaInsumos } from '../../Pages/PaginaInsumos.js'
import { BigAddButton } from '../Buttons/BigAddButton.js';
import { InsumosMenuMobile } from '../Menus/InsumosMenuMobile.js';
import { PageLoading } from '../../Pages/PageLoading.js';
import { setInLocalStorage } from '../../helper/localStorage';
import { typeLocal } from '../../constant/localStorage';

const AddButton = ({ path }) => {
    return (
        <div
            className="
                flex items-center justify-center
                h-full w-full
                overflow-scroll
            "
        >
            <BigAddButton
                to={ path }
                title="Nuevo insumo"
            />
        </div>
    )
}

export const MisInsumosContainer = () => {

    const dispatch = useDispatch();

    const {
        insumos,
        search: { isSearching, isFiltering }
    } = useSelector( state => state );

    useEffect( () => {

        dispatch( startLoadingInsumos() );

    }, []);

    return (
        <div
            className="layout__page"
        >

            { isEmpty( insumos ) && !( isFiltering || isSearching )

                ? <AddButton path={ nuevoInsumoPath } />

                : <PaginaInsumos insumos={ insumos } />

            }

            <InsumosMenuMobile />
        </div>
    )
}
