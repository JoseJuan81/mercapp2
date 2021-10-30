import { equality, filter, isEmpty } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { selectAllInsumosToBuy } from '../../actions/insumosAction';
import { showSearchField, hideSearchAndFilterField, showFilterField } from '../../actions/searchAction';

import { nuevaCompraPath, nuevoInsumoPath } from '../../constant/routes';
import { AddCircleButton } from '../Buttons/AppButtons';

export const InsumosMenuMobile = React.memo(() => {

    const url = new URL( window.location );

    const { showField, isSearching, isFiltering } = useSelector( state => state.search );
    const selectedInsumos = useSelector( state => filter( equality( 'selected', true ), state.insumos ));

    const [newInsumoRouteModificated, setNewInsumoRouteModificated] = useState( nuevoInsumoPath )

    const dispatch = useDispatch();

    const toogleShowSearch = () => {
        
        if ( ( showField && isFiltering ) || !showField ) {
            
            dispatch( showSearchField() );
        } else {
            
            dispatch( hideSearchAndFilterField() );
        }
    }

    const toogleShowFilter = () => {

        if ( ( showField && isSearching ) || !showField ) {
            
            dispatch( showFilterField() );
        } else {
            
            dispatch( hideSearchAndFilterField() );
        }
    }

    useEffect( () => {
        
        let newRoute = nuevoInsumoPath;

        if ( url.searchParams.get('activeBuy') && url.searchParams.get('establishment') ) {
                newRoute += url.search;
        }

        setNewInsumoRouteModificated( newRoute );
        
    }, [])

    return (
        <div
            className="
                menu_mobile__container
                grid-cols-6
            "
        >
            
            <button
                className="btn-icon"
                title="Seleccionar todo"
                onClick={ () => dispatch( selectAllInsumosToBuy( true ) ) }
            >
                <i className="fas fa-check-circle"></i>
            </button>

            <button
                className="btn-icon"
                title="Deseleccionar todo"
                onClick={ () => dispatch( selectAllInsumosToBuy( false ) ) }
            >
                <i className="far fa-check-circle"></i>
            </button>

            <button
                className="btn-icon"
                title="Buscar"
                onClick={ toogleShowSearch }
            >
                <i className="fas fa-search"></i>
            </button>

            <button
                className="btn-icon"
                title="Filtrar"
                onClick={ toogleShowFilter }
            >
                <i className="fas fa-filter"></i>
            </button>

            <NavLink
                to={ nuevaCompraPath }
                className="
                    btn-icon
                    flex items-center justify-center
                    relative
                "
            >
                <i className="fas fa-shopping-cart"></i>

                { !isEmpty( selectedInsumos ) &&
                    <div
                        className="
                            absolute top-2 right-4
                            text-xs font-medium
                            bg-white
                            w-5 h-5 rounded-full
                            flex items-center justify-center
                            border-2 border-solid border-lime-500
                        "
                    >{ selectedInsumos.length }</div>
                }
            </NavLink>

            <AddCircleButton
                to={ newInsumoRouteModificated }
            />

        </div>
    )
})
