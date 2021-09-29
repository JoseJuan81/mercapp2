import { isEmpty, map, setNewProperty } from "functionallibrary";
import { insumosType } from "../constant/insumosType";
import { typeLocal } from "../constant/localStorage";
import { db } from "../firebase/firebase-config";
import { extractInsumosFromFirestoreResponse } from "../helper/firestore";
import { getFromLocalStorage, removeInsumoFromLocalStorage, setInLocalStorage } from "../helper/localStorage";
import { updateArrayWithArray } from "../helper/updateArrayWithArray";
import { updateItemInArrayByProp } from "../helper/updateItemInArrayByProp";
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

export const getInsumos = ( prop = 'name' ) => ({
    type: insumosType.getAll,
    payload: prop
});

export const deleteInsumo = (id) => ({
    type: insumosType.deleteInsumoById,
    payload: id
});

export const updateInsumoInState = ( insumoUpdated ) => ({
    type: insumosType.updateInsumos,
    payload: insumoUpdated
});

export const searchInsumo = ( insumos, searchValue ) => ({
    type: insumosType.search,
    payload: { insumos, searchValue }
})

export const filterInsumo = ( insumos, filterValue ) => ({
    type: insumosType.filter,
    payload: { insumos, filterValue }
})

export const selectInsumo = ( insumo ) => ({
    type: insumosType.select,
    payload: insumo
})

export const selectAllInsumos = ( newState ) => ({
    type: insumosType.selectAll,
    payload: newState
})

export const searchingInsumo = ( val ) => dispatch => {

    const localInsumos = getFromLocalStorage( typeLocal.insumos ) || [];

    dispatch( searchInsumo( localInsumos, val ) );
}

export const filteringInsumo = ( val ) => dispatch => {

    const localInsumos = getFromLocalStorage( typeLocal.insumos ) || [];

    dispatch( filterInsumo( localInsumos, val ) );
}

export const selectInsumoToBuy = ( insumo ) => dispatch => {

    const localInsumos = getFromLocalStorage( typeLocal.insumos );
    setInLocalStorage( typeLocal.insumos, [...updateItemInArrayByProp( 'id', insumo, localInsumos )] );

    dispatch( selectInsumo( insumo ) );
}

export const selectAllInsumosToBuy = ( flag ) => ( dispatch, rootState ) => {

    const state = rootState().insumos;
    const newState = map( setNewProperty( 'selected', flag ), state );
    const localInsumos = getFromLocalStorage( typeLocal.insumos ) || [];

    if ( localInsumos.length === newState.length ) {

        setInLocalStorage( typeLocal.insumos, [...newState] );
    } else {

        const localUpdated = updateArrayWithArray( localInsumos, newState, 'id' );
        setInLocalStorage( typeLocal.insumos, [...localUpdated]);
    }
    
    dispatch( selectAllInsumos( newState ) );
}

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

            setInLocalStorage( typeLocal.insumos, [...insumos] );

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
        removeInsumoFromLocalStorage( id );

    } catch (error) {
        console.log( 'No fue posible eliminar el insumo', error );
    }
}