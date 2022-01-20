import { type } from "../constant/type"

import { fetchDeletePurchase, fetchPurchase } from "../helper/fetch";
import { removeFromLocalStorage } from "../helper/localStorage";
import { NotificationError } from "../helper/toast";

import { endLoading, startLoading } from "./loadingAction";

import { selectPurchase, unSelectAllPurchases } from "./purchasesAction";

/// ============= Acciones sincronas ================= //

/// ============= Acciones Asincronas ================= //
export const startLoadingPurchaseDetails = ( id ) => async ( dispatch ) => {

    dispatch( startLoading() );

    try {

        const response = await fetchPurchase( id );

        if ( response.ok ) {

            dispatch( selectPurchase( response.data ));
        } else {

            NotificationError( response.msg );
        }

    } catch (error) {
        NotificationError( type.notificationMessages.purchasesLoadedError );
        console.log('Error: no fue posible obtener la informacion de la compra');
    } finally {
        dispatch( endLoading() );
    }
}

export const startDeletingPurchase = ( id ) => async ( dispatch ) => {

    dispatch( startLoading() );

    try {

        const response = await fetchDeletePurchase( id );

        if ( response.ok ) {

            dispatch( unSelectAllPurchases() );
            removeFromLocalStorage( type.localStorage.purchases );
        } else {

            NotificationError( response.msg );
        }

    } catch (error) {
        NotificationError( type.notificationMessages.purchasesLoadedError );
        console.log('Error: no fue posible obtener la informacion de la compra');
    } finally {
        dispatch( endLoading() );
    }
}