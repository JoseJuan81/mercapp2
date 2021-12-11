import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unSelectAllInsumos } from '../../actions/purchasesAction';

import { startLoadingPurchaseDetails } from '../../actions/purchasesDetailsAction';

import { LoadingPaginaDetalleCompra } from '../../Pages/loading/LoadingPaginaDetalleCompra';
import { PaginaDetalleCompra } from '../../Pages/PaginaDetalleCompra';

export const DetalleCompraContainer = () => {

    // ===== NAVIGATOR =====
    const url = new URL( window.location );

    // ===== STORE =====
    const dispatch = useDispatch();
    const { loading } = useSelector( store => store.loading );
    const { selected } = useSelector( store => store.purchases );

    // ===== VARIABLES LOCALES =====
    const purchase = selected[0];

    // API en caso selected no exista ( ej. al recargar pantalla )
    useEffect(() => {
        const id = url.searchParams.get('id');

        if ( !purchase && id ) {
            dispatch( startLoadingPurchaseDetails( id ) );
        }

    },[]);

    // Limpiar newPurchase.seleted del store al salir de la pantalla
    useEffect(() => {
        return () => {
            dispatch( unSelectAllInsumos() );
        }
    },[])

    return (
        <div>
            {loading || !purchase
                ? <LoadingPaginaDetalleCompra />
                : <PaginaDetalleCompra details={ purchase } />
            }
        </div>
    )
}
