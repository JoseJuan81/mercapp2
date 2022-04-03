import { equality, find } from "functionallibrary";
import { type } from "../constant/type";
import { getFromLocalStorage } from "../helper/localStorage";
import { NotificationError } from "../helper/toast";
import { endLoading, startLoading } from "./loadingAction";

/// ============= Acciones sincronas ================= //
export const setInsumoData = ( insumoData ) => ({
    type: type.insumoDetails.setData,
    payload: insumoData
})

/// ============= Acciones asincronas ================= //
export const startLoadingInsumoData = ( insumoId ) => async dispatch => {

    dispatch( startLoading() );
    const insumos = getFromLocalStorage( type.localStorage.insumos );
    const insumo =  find( equality( 'id', insumoId), insumos );

    try {

        if ( insumo ) {
            const { price, ...rest } = insumo;
            dispatch( setInsumoData({ prices: price, data: { ...rest } }) );
    
        } else {
            // consumir servicio para obtener datos del insumo
        }

    } catch( error ) {

        console.log('Error: obteniendo datos del insumo', error);
        NotificationError( type.notificationMessages.getInsumoDetailsError );

    } finally {
        dispatch( endLoading() );
    }
}