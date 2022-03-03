import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectAllFavorites, selectAllInsumosToBuy } from '../../actions/insumosAction';
import { cleaningNewPurchase } from '../../actions/newPurchaseAction';
import { showSearchField, hideSearchAndFilterField, showFilterField } from '../../actions/searchAction';

import { AddCircleButton, CheckCircleButton, CheckFullFilledCircleButton, FilterButton, HeartButton, HeartSolidButton, SearchButton, ShoppingCarButton } from '../Buttons/AppButtons';

export const InsumosMenuMobile = React.memo(({ newInsumoPath }) => {

    // ===== STORE =====
    const dispatch = useDispatch();
    const { showField, isSearching, isFiltering } = useSelector( store => store.search );

    // ===== STATE =====
    const [selectAll, setSelectAll] = useState( false );
    const [isMounting, setIsMounting] = useState( true );
    const [isFavorites, setIsFavorites] = useState( false );

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

    useEffect(() => {

        if ( !isMounting ) {

            if ( !selectAll ) {
    
                dispatch( cleaningNewPurchase() );

            }

            dispatch( selectAllInsumosToBuy( selectAll ) );
    
        } else {

            setIsMounting( false );
        }

    },[selectAll, dispatch])

    useEffect(() => {

        if ( !isMounting ) {

            dispatch( selectAllFavorites( isFavorites ) );

        }

    },[isFavorites, dispatch])

    return (
        <div
            className="
                menu_mobile__container
                grid-cols-6
            "
        >
            
            {selectAll
                ? <CheckFullFilledCircleButton
                    isButton
                    onClick={ () => setSelectAll( s => !s ) }
                />
                : <CheckCircleButton
                    isButton
                    onClick={ () => setSelectAll( s => !s ) }
                />
            }

            {isFavorites
                ? <HeartSolidButton
                    isButton
                    className="
                        text-rose-500
                    "
                    onClick={ () => setIsFavorites( s => !s ) }
                />
                : <HeartButton
                    isButton
                    onClick={ () => setIsFavorites( s => !s ) }
                />
            }

            <SearchButton
                isButton
                onClick={ toogleShowSearch }
            />

            <FilterButton
                isButton
x                onClick={ toogleShowFilter }
            />

            

            <AddCircleButton
                to={ newInsumoPath }
            />

        </div>
    )
})
