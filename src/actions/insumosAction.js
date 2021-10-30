import { isEmpty, map, setNewProperty } from "functionallibrary";

import { type } from "../constant/type";

import { db } from "../firebase/firebase-config";

import { endLoading, startLoading } from "./loadingAction";

import { fetchInsumos } from "../helper/fetch";
import { getFromLocalStorage, removeInsumoFromLocalStorage, setInLocalStorage } from "../helper/localStorage";
import { updateArrayWithArray } from "../helper/updateArrayWithArray";
import { updateItemInArrayByProp } from "../helper/updateItemInArrayByProp";

/// ============= Acciones sincronas ================= //
export const addInsumoToState = ( newInsumo ) => ({
    type: type.insumos.add,
    payload: newInsumo
});

export const setInsumos = ( insumos ) => ({
    type: type.insumos.set,
    payload: insumos
});

export const getInsumos = ( prop = 'name' ) => ({
    type: type.insumos.getAll,
    payload: prop
});

export const deleteInsumo = (id) => ({
    type: type.insumos.deleteInsumoById,
    payload: id
});

export const updateInsumoInState = ( insumoUpdated ) => ({
    type: type.insumos.updateInsumos,
    payload: insumoUpdated
});

export const searchInsumo = ( insumos, searchValue ) => ({
    type: type.insumos.search,
    payload: { insumos, searchValue }
})

export const filterInsumo = ( insumos, filterValue ) => ({
    type: type.insumos.filter,
    payload: { insumos, filterValue }
})

export const selectInsumo = ( insumo ) => ({
    type: type.insumos.select,
    payload: insumo
})

export const selectAllInsumos = ( newState ) => ({
    type: type.insumos.selectAll,
    payload: newState
})

export const searchingInsumo = ( val ) => dispatch => {

    const localInsumos = getFromLocalStorage( type.localStorage.insumos ) || [];

    dispatch( searchInsumo( localInsumos, val ) );
}

export const filteringInsumo = ( val ) => dispatch => {

    const localInsumos = getFromLocalStorage( type.localStorage.insumos ) || [];

    dispatch( filterInsumo( localInsumos, val ) );
}

export const selectInsumoToBuy = ( insumo ) => dispatch => {

    const localInsumos = getFromLocalStorage( type.localStorage.insumos );
    setInLocalStorage(
        type.localStorage.insumos,
        [...updateItemInArrayByProp( 'id', insumo, localInsumos )],
    );

    dispatch( selectInsumo( insumo ) );
}

export const selectAllInsumosToBuy = ( flag ) => ( dispatch, rootState ) => {

    const state = rootState().insumos;
    const newState = map( setNewProperty( 'selected', flag ), state );
    const localInsumos = getFromLocalStorage( type.localStorage.insumos ) || [];

    if ( localInsumos.length === newState.length ) {

        setInLocalStorage( type.localStorage.insumos, [...newState] );
    } else {

        const localUpdated = updateArrayWithArray( localInsumos, newState, 'id' );
        setInLocalStorage( type.localStorage.insumos, [...localUpdated]);
    }
    
    dispatch( selectAllInsumos( newState ) );
}

/// ============= Acciones asincronas ================= //
export const startLoadingInsumos = () => async ( dispatch, rootState ) => {
    dispatch( startLoading() );

    const localInsumos = getFromLocalStorage( type.localStorage.insumos );

    if ( isEmpty( localInsumos ) ) {

        try {

            const response = await fetchInsumos();

            dispatch( setInsumos( response.data ) );

            setInLocalStorage( type.localStorage.insumos, [...response.data] );

        } catch(err) {

            console.error( 'Error al cargar insumos de la BD', err );
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