import { equality, filter, isEmpty } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectAllInsumosToBuy } from '../../actions/insumosAction';
import { cleaningNewPurchase } from '../../actions/newPurchaseAction';
import { showSearchField, hideSearchAndFilterField, showFilterField } from '../../actions/searchAction';

import { nuevaCompraPath, nuevoInsumoPath } from '../../constant/routes';
import { AddCircleButton, CheckCircleButton, CheckFullFilledCircleButton, FilterButton, SearchButton, ShoppingCarButton } from '../Buttons/AppButtons';

export const InsumosMenuMobile = React.memo(() => {

    const url = new URL( window.location );

    // ===== STORE =====
    const dispatch = useDispatch();
    const { showField, isSearching, isFiltering } = useSelector( state => state.search );
    const selectedInsumos = useSelector( state => filter( equality( 'selected', true ), state.insumos ));

    // ===== STATE =====
    const [newInsumoRouteModificated, setNewInsumoRouteModificated] = useState( nuevoInsumoPath )


    // ===== FUNCIONES PROPIAS =====
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

    const handleClickOnCheckButton = ( flag ) => {

        if ( !flag ) {

            dispatch( cleaningNewPurchase() );
        }

        dispatch( selectAllInsumosToBuy( flag ) )
    }

    // ===== ACTUALIZAR RUTA =====
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
                onClick={ () => handleClickOnCheckButton( true ) }
            />

            <CheckCircleButton
                isButton
                onClick={ () => handleClickOnCheckButton( false ) }
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
