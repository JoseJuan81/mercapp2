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

export const deleteInsumo = (id) => ({
    type: insumosType.deleteInsumoById,
    payload: id
});

/// ============= Acciones asincronas ================= //
export const startLoadingInsumos = () => async ( dispatch, rootState ) => {

    const { uid } = rootState().auth;

    const response = await db.collection( `${ uid }/app/insumos` ).get();

    const insumos = extractInsumosFromFirestoreResponse( response );

    dispatch( setInsumos( insumos ) );
}

export const startDeletingInsumos = ( id ) => async ( dispatch, rootState ) => {

    const { uid } = rootState().auth;

    try {
        
        await db.doc( `${ uid }/app/insumos/${ id }` ).delete();

        dispatch( deleteInsumo( id ) );

    } catch (error) {
        console.log( 'No fue posible eliminar el insumo', error );
    }
}