import { isEmpty } from "functionallibrary";
import { insumosType } from "../constant/insumosType";
import { typeLocal } from "../constant/localStorage";
import { db } from "../firebase/firebase-config";
import { getFromLocalStorage } from "../helper/localStorage";
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

    const localInsumos = getFromLocalStorage( typeLocal.insumos );

    if ( isEmpty( localInsumos ) ) {

        const { uid } = rootState().auth;
    
        try {

            const response = await db.collection( `${ uid }/app/insumos` ).get();
        
            const insumos = extractInsumosFromFirestoreResponse( response );
            dispatch( setInsumos( insumos ) );

        } catch(err) {

            console.warn( 'Error al cargar insumos de la BD', err );
        }

    } else {
        
        dispatch( setInsumos( localInsumos ) );
    }


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