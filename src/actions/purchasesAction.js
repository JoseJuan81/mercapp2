import { type } from "../constant/type"
import { fetchAllPurchases } from "../helper/fetch";
import { getFromLocalStorage, setInLocalStorage } from "../helper/localStorage";
import { NotificationError } from "../helper/toast";
import { endLoading, startLoading } from "./loadingAction";

/// ============= Acciones sincronas ================= //
export const getAllPurchases = ( purchases ) => ({
    type: type.purchases.getAll,
    payload: purchases
})

export const selectPurchase = ( purchase ) => ({
    type: type.purchases.select,
    payload: purchase
})

export const unSelectPurchase = ( purchase ) => ({
    type: type.purchases.unselect,
    payload: purchase
})

export const unSelectAllPurchases = () => ({
    type: type.purchases.unselectAll,
})

export const selectMultiPurchases = ( purchases ) => ({
    type: type.purchases.multiSelect,
    payload: purchases
})

/// ============= Acciones Asincronas ================= //
export const startGettingPurchases = () => async ( dispatch ) => {

    dispatch( startLoading() );

    try {

        const localPurchases = getFromLocalStorage( type.localStorage.purchases );
        let response = localPurchases;

        if ( response ) {
            
            dispatch( getAllPurchases( response ));
        } else {

            response = await fetchAllPurchases();
            dispatch( getAllPurchases( response.data ));
            setInLocalStorage( type.localStorage.purchases, response.data );
        }

        // NotificationSuccess( type.notificationMessages.purchasesLoaded );

    } catch (error) {
        NotificationError( type.notificationMessages.purchasesLoadedError );
        console.log('Error: no se pudieron obtener las compras');
    } finally {
        dispatch( endLoading() );
    }
}