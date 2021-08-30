import { insumosType } from "../constant/insumosType";
import { db } from "../firebase/firebase-config";
import { extractInsumosFromFirestoreResponse } from "../helper/utils";

/// ============= Acciones sincronas ================= //
export const addInsumoToState = ( newInsumo ) => ({
    type: insumosType.add,
    payload: newInsumo
});

export const setInsumos = ( insumos ) => ({
    type: insumosType.set,
    payload: insumos
});

export const getInsumos = () => ({
    type: insumosType.getAll,
});

/// ============= Acciones asincronas ================= //
export const startLoadingInsumos = () => async ( dispatch, rootState ) => {

    const { uid } = rootState().auth;

    const response = await db.collection( `${ uid }/app/insumos` ).get();

    const insumos = extractInsumosFromFirestoreResponse( response );

    dispatch( setInsumos( insumos ) );
}