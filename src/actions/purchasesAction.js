import { type } from "../constant/type"
import { fetchAllPurchases } from "../helper/fetch";
import { endLoading, startLoading } from "./loadingAction";

/// ============= Acciones sincronas ================= //
export const getAllPurchases = ( purchases ) => ({
    type: type.purchases.getAll,
    payload: purchases
})

/// ============= Acciones Asincronas ================= //
export const startGettingPurchases = () => async ( dispatch ) => {

    dispatch( startLoading() );

    try {
        const response = await fetchAllPurchases();

        dispatch( getAllPurchases( response.data ));

    } catch (error) {
        console.log('Error: no se pudieron obtener las compras');
    } finally {
        dispatch( endLoading() );
    }
}