import { type } from "../constant/type";
import { buildEstablishmentOptionsArray } from "../helper/buildEstablishmentOptionsArray";
import { fetchEstablishments } from "../helper/fetch";
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

        const response = await fetchEstablishments();

        const establishmentsParsed = buildEstablishmentOptionsArray( response.data );
        dispatch( setEstablishments( establishmentsParsed ) );

    } catch ( e ) {

        console.log('Error: error obteniendo los establecimientos', e );

    } finally {

        dispatch( endLoading() );

    }
}