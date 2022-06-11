import { equality, filter } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectAllFavorites, selectAllInsumosToBuy } from '../../actions/insumosAction';
import { cleaningNewPurchase } from '../../actions/newPurchaseAction';

import {
    AddCircleButton,
    CheckCircleButton,
    CheckFullFilledCircleButton,
    HeartButton,
    HeartSolidButton,
    ListButton,
    //PriceStatisticsButton,
    //ShoppingCarPlusButton,
} from '../Buttons/AppButtons';

export const InsumosMenuMobile = React.memo(({ newInsumoPath, listaComprasPath }) => {

    // ===== STORE =====
    const dispatch = useDispatch();
    const selectedInsumos = useSelector( store => filter( equality( 'selected', true ), store.insumos.data ));

    // ===== STATE =====
    const [selectAll, setSelectAll] = useState( false );
    const [isMounting, setIsMounting] = useState( true );
    const [isFavorites, setIsFavorites] = useState( false );

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
                grid-cols-4
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

            <ListButton
                to={ listaComprasPath }
                disabled={ selectedInsumos.length === 0 }
            />    

            <AddCircleButton
                to={ newInsumoPath }
            />

        </div>
    )
})
