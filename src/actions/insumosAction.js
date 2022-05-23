import { always, cond, equals, T } from "ramda";
import { isEmpty, map, setNewProperty } from "functionallibrary";

import { type } from "../constant/type";

import { endLoading, startLoading } from "./loadingAction";

import { fetchDeleteInsumo, fetchFavorite, fetchInsumos } from "../helper/fetch";
import { getFromLocalStorage, removeInsumoFromLocalStorage, setInLocalStorage } from "../helper/localStorage";
import { updateArrayWithArray } from "../helper/updateArrayWithArray";
import { updateItemInArrayByProp } from "../helper/updateItemInArrayByProp";
import { NotificationError } from "../helper/toast";

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

export const searchInsumo = ( searchValue ) => ({
    type: type.insumos.search,
    payload: searchValue
})

export const filterInsumo = ( filterValue ) => ({
    type: type.insumos.filter,
    payload: filterValue
})

export const selectInsumo = ( insumo ) => ({
    type: type.insumos.select,
    payload: insumo
})

export const selectAllInsumos = ( newState ) => ({
    type: type.insumos.selectAll,
    payload: newState
})

export const selectAllFavorites = ( flag ) => ({
    type: type.insumos.favorites,
    payload: flag
})

export const searchingInsumo = ( val ) => dispatch => {

    dispatch( searchInsumo( val ) );
}

export const filteringInsumo = ( val ) => dispatch => {

    dispatch( filterInsumo( val ) );
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

    const state = rootState().insumos.cache;
    const newState = map( setNewProperty( 'selected', flag ), state );
    const localInsumos = getFromLocalStorage( type.localStorage.insumos ) || [];

    if ( localInsumos.length === newState.length ) {

        setInLocalStorage( type.localStorage.insumos, [...newState] );
    } else {

        const localUpdated = updateArrayWithArray( localInsumos, newState );
        setInLocalStorage( type.localStorage.insumos, [...localUpdated]);
    }
    
    dispatch( selectAllInsumos( newState ) );
}

/// ============= Acciones asincronas ================= //
export const startLoadingInsumos = () => async ( dispatch, rootState ) => {
    dispatch( startLoading() );

    let localInsumos = getFromLocalStorage( type.localStorage.insumos );
    const insumosCache = rootState().insumos.cache;

    if ( isEmpty( localInsumos ) ) {

        try {

            const response = await fetchInsumos();

            dispatch( setInsumos( response.data ) );

            setInLocalStorage( type.localStorage.insumos, [...response.data] );

        } catch(err) {

            console.error( 'Error al cargar insumos de la BD', err );
        }

    } else {

        const getLocalInsumos = cond([
            [() => equals( localInsumos.length, insumosCache.length), always(insumosCache)],
            [() => equals( insumosCache.length, 0), always(localInsumos)],
            [() => insumosCache.length > localInsumos.length, always(insumosCache)],
            [T, always( localInsumos )]
        ])
        dispatch( setInsumos( getLocalInsumos() ) );
    }


    dispatch( endLoading() );
}

export const startDeletingInsumos = ( id ) => async dispatch => {

    dispatch( startLoading() );

    try {

        await fetchDeleteInsumo( id );

        dispatch( deleteInsumo( id ) );
        removeInsumoFromLocalStorage( id );

    } catch (error) {
        console.log( 'No fue posible eliminar el insumo', error );
    } finally {
        dispatch( endLoading() );
    }
}

export const startIsFavorite = ( insumoUpdated ) => async ( dispatch, rootState ) => {

    dispatch( startLoading() );

    const localInsumos = rootState().insumos.cache;
    
    try {

        const response = await fetchFavorite( insumoUpdated );

        if ( response.ok ) {

            const insumosUpdated = updateItemInArrayByProp( 'id', insumoUpdated, localInsumos );

            dispatch( setInsumos( insumosUpdated ) );
            setInLocalStorage( type.localStorage.insumos, [...insumosUpdated] );

        } else {

            NotificationError( type.notificationMessages.isFavoriteError );
            NotificationError( response.msg );
        }

    } catch (error) {
        
        console.log('Error en servicio de favorito', error);
    } finally {

        dispatch( endLoading() );
    }

}