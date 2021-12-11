import { type } from "../constant/type"

import { fetchPurchase } from "../helper/fetch";
import { NotificationError } from "../helper/toast";

import { endLoading, startLoading } from "./loadingAction";

import { selectPurchase } from "./purchasesAction";

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