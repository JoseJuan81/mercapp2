import { insumosType } from "../constant/insumosType";
import { db } from "../firebase/firebase-config";
import { extractInsumosFromFirestoreResponse } from "../helper/utils";
import { endLoading, startLoading } from "./loadingAction";

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

export const updateInsumoInState = ( insumoUpdated ) => ({
    type: insumosType.updateInsumos,
    payload: insumoUpdated
});

export const searchingInsumo = ( searchValue ) => ({
    type: insumosType.search,
    payload: searchValue
})

export const filteringInsumo = ( filterValue ) => ({
    type: insumosType.filter,
    payload: filterValue
})

export const selectInsumoToBuy = ( insumoId ) => ({
    type: insumosType.select,
    payload: insumoId
})

export const selectAllInsumosToBuy = () => ({
    type: insumosType.selectAll,
})

export const unSelectAllInsumosToBuy = () => ({
    type: insumosType.unSelectAll
})

/// ============= Acciones asincronas ================= //
export const startLoadingInsumos = () => async ( dispatch, rootState ) => {

    dispatch( startLoading() );

    const { uid } = rootState().auth;

    const response = await db.collection( `${ uid }/app/insumos` ).get();

    const insumos = extractInsumosFromFirestoreResponse( response );

    dispatch( setInsumos( insumos ) );

    dispatch( endLoading() );
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