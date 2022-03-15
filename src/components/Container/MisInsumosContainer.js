import { isEmpty } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { nuevoInsumoPath } from '../../constant/routes';

import { startLoadingInsumos } from '../../actions/insumosAction';

import { PaginaInsumos } from '../../Pages/PaginaInsumos.js'
import { LoadingPaginaInsumos } from '../../Pages/loading/LoadingPaginaInsumos';

import { BigAddButton } from '../Buttons/BigAddButton.js';
import { InsumosMenuMobile } from '../Menus/InsumosMenuMobile.js';

export const MisInsumosContainer = () => {

    const url = new URL( window.location );
    
    // ===== STORE =====
    const dispatch = useDispatch();
    
    const {
        insumos: { data: insumos },
        search: { isSearching, isFiltering }
    } = useSelector( store => store );

    const { loading } = useSelector( state => state.loading );

    // ===== STATE =====
    const [newInsumoRouteModificated, setNewInsumoRouteModificated] = useState( nuevoInsumoPath );

    useEffect( () => {

        dispatch( startLoadingInsumos() );

    }, []);

    // ===== ACTUALIZAR RUTA NUEVO INSUMO =====
    useEffect( () => {
        
        let newRoute = nuevoInsumoPath;

        if ( url.searchParams.get('activeBuy') ) {
                newRoute += url.search;
        }

        setNewInsumoRouteModificated( newRoute );
        
    }, [url.searchParams, url.search])

    if ( loading ) {
        return <LoadingPaginaInsumos />
    }

    return (
        <div
            data-cy="MisInsumosContainer"
            className="layout__page"
        >

            { isEmpty( insumos ) && !( isFiltering || isSearching )

                ? <AddButton path={ newInsumoRouteModificated } />

                : <PaginaInsumos insumos={ insumos } />

            }

            <InsumosMenuMobile newInsumoPath={ newInsumoRouteModificated } />
        </div>
    )
}

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
