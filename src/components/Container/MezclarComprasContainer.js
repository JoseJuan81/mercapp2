import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'functionallibrary';

import { unSelectAllPurchases } from '../../actions/purchasesAction';

import { PaginaMezclarCompras } from '../../Pages/PaginaMezclarCompras';
import { LoadingMezclarComprasPage } from '../../Pages/loading/LoadingMezclarComprasPage';
import { startLoadingPurchases } from '../../actions/mezclarPurchases';

export const MezclarComprasContainer = () => {

    // ===== NAVIGATOR =====
    const url = new URL( window.location );

    // ===== STORE =====
    const dispatch = useDispatch();
    const { loading } = useSelector( store => store.loading );
    const { selected } = useSelector( store => store.purchases );

    // Limpiar newPurchase.seleted del store al salir de la pantalla
    useEffect(() => {
        return () => {
            dispatch( unSelectAllPurchases() );
        }
    },[])

    // Cargar las compras en caso no existan en el store
    useEffect( () => {

        if ( isEmpty( selected ) ) {
            const purchasesQuery = url.searchParams.get('compras');
            const ids = purchasesQuery.split(',');
            dispatch( startLoadingPurchases( ids ) );
        }

    },[selected, url, dispatch])

    return (
        <div>
            
            {loading || isEmpty( selected )
                ? <LoadingMezclarComprasPage />
                : <PaginaMezclarCompras purchases={ selected } />
            }
            
        </div>
    )
}
