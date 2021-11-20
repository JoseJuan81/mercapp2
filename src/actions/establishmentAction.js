import { type } from "../constant/type";

import { buildEstablishmentOptionsArray } from "../helper/buildEstablishmentOptionsArray";
import { fetchEstablishments } from "../helper/fetch";
import { getFromLocalStorage, setInLocalStorage } from "../helper/localStorage";
import { NotificationError } from "../helper/toast";

import { endLoading, startLoading } from "./loadingAction";

/// ============= Acciones sincronas ================= //
export const setEstablishments = ( establishmentsList ) => ({
    type:  type.establishment.set,
    payload: establishmentsList
})

/// ============= Acciones asincronas ================= //
export const loadEstablishments = () => async dispatch => {

    dispatch( startLoading() );

    try {
        
        const localEstablisments = getFromLocalStorage( type.localStorage.establishments );

        if ( localEstablisments ) {

            dispatch( setEstablishments( localEstablisments ) );

        } else {

            const response = await fetchEstablishments();
            const establishmentsParsed = buildEstablishmentOptionsArray( response.data );
            dispatch( setEstablishments( establishmentsParsed ) );

            setInLocalStorage( type.localStorage.establishments, establishmentsParsed );

        }

    } catch ( e ) {

        console.log('Error: error obteniendo los establecimientos', e );
        NotificationError( type.notificationMessages.establishmentsError );

    } finally {

        dispatch( endLoading() );

    }
}