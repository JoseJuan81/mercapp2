import { equality, filter, isEmpty } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { selectAllInsumosToBuy } from '../../actions/insumosAction';
import { showSearchField, hideSearchAndFilterField, showFilterField } from '../../actions/searchAction';

import { nuevaCompraPath, nuevoInsumoPath } from '../../constant/routes';
import { AddCircleButton, CheckCircleButton, CheckFullFilledCircleButton, FilterButton, SearchButton, ShoppingCarButton } from '../Buttons/AppButtons';

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

        if ( url.searchParams.get('activeBuy') ) {
                newRoute += url.search;
        }

        setNewInsumoRouteModificated( newRoute );
        
    }, [url.searchParams, url.search])

    return (
        <div
            className="
                menu_mobile__container
                grid-cols-6
            "
        >
            
            <CheckFullFilledCircleButton
                isButton
                onClick={ () => dispatch( selectAllInsumosToBuy( true ) ) }
            />

            <CheckCircleButton
                isButton
                onClick={ () => dispatch( selectAllInsumosToBuy( false ) ) }
            />

            <SearchButton
                isButton
                onClick={ toogleShowSearch }
            />

            <FilterButton
                isButton
x                onClick={ toogleShowFilter }
            />

            <ShoppingCarButton
                to={ nuevaCompraPath }
                className="
                    relative
                "
            >
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
            </ShoppingCarButton>

            <AddCircleButton
                to={ newInsumoRouteModificated }
            />

        </div>
    )
})
