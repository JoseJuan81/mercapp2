
import { equality, find, isEmpty, setNewProperty } from "functionallibrary";

import { addInsumoToState, updateInsumoInState } from "./insumosAction";
import { endLoading, startLoading } from "./loadingAction";

import { getFromLocalStorage, removeFromLocalStorage, setInLocalStorage, updateInsumoInLocalStorage } from "../helper/localStorage";
import { priceFromArrayToObject } from "../helper/priceHandling";
import { fetchCreateInsumo, fetchInsumo, fetchUpdateInsumo } from "../helper/fetch";
import { NotificationError, NotificationSuccess } from "../helper/toast";

import { type } from "../constant/type";

/// ============= Acciones sincronas ================= //
export const fillingForm = ( { name, value } ) => {

    const isPrice = name === 'price';

    if ( isPrice ) {

        return {
            type: type.newInsumo.fill,
            payload: {
                [name]: priceFromArrayToObject( value )
            }
        }

    }

    return {
        type: type.newInsumo.fill,
        payload: { [name]: value }
    }
}

export const resetForm = () => ({
    type: type.newInsumo.reset
})

export const updatingInsumo = ( insumo ) => ({
    type: type.newInsumo.update,
    payload: insumo
});

export const setInsumoToUpdate = ( insumoId ) => ( dispatch, rootState ) => {

    const insumos = isEmpty( rootState().insumos )
        ? getFromLocalStorage( type.localStorage.insumos )
        : rootState().insumos.data;

    const insumoToUpdate = find(
        equality( 'id', insumoId ),
        insumos
    );

    dispatch( updatingInsumo( insumoToUpdate ) );
}

/// ============= Acciones asincronas ================= //
export const startCreateInsumo = ( isSelected ) => async ( dispatch, rootState ) => {

    dispatch( startLoading() );

    const localInsumos = getFromLocalStorage( type.localStorage.insumos ) || [];

    const { newInsumo: { data }, insumos: { data: insumos } } = rootState();
    const allInsumos = isEmpty( insumos ) ? localInsumos : insumos;

    try {
        
        const response = await fetchCreateInsumo( data );

        if ( response.ok ) {

            const insumoCreated = setNewProperty('selected', !!isSelected, response.data );
            dispatch( addInsumoToState( insumoCreated ) );
            setInLocalStorage( type.localStorage.insumos, [insumoCreated, ...allInsumos] );
    
            NotificationSuccess( type.notificationMessages.newInsumoCreated );
    
            dispatch ( resetForm() );
    
            removeFromLocalStorage( type.localStorage.establishments );

        } else {
            NotificationError( type.notificationMessages.newInsumoCreatedError );
            NotificationError( response.msg );
        }


    } catch (error) {

        NotificationError( type.notificationMessages.newInsumoCreatedError );
        console.error( 'Error al crear insumo ', error);

    } finally {

        dispatch( endLoading() );
    }


}

export const startLoadingInsumoData = ( id ) => async ( dispatch ) => {

    dispatch( startLoading() );

    try {

        const { data } = await fetchInsumo( id );
        dispatch( updatingInsumo( { ...data } ) );

        NotificationSuccess( type.notificationMessages.insumosLoaded );
        
    } catch(err) {

        dispatch( updatingInsumo({}) );
        NotificationError( err );
        console.log('Error al obtener data del insumo', err);

    } finally {

        dispatch( endLoading() );

    }

}

export const startUpdateInsumo = () => async ( dispatch, rootState ) => {

    dispatch( startLoading() );

    const { newInsumo: { data } } = rootState();

    const { selected } = data;

    try {
        
        const response = await fetchUpdateInsumo( data );

        if ( response.ok ) {
            
            const insumoUpdated = response.data;
        
            dispatch( updateInsumoInState( { ...insumoUpdated, selected } ) );
    
            dispatch ( resetForm() );
            updateInsumoInLocalStorage( { ...insumoUpdated, selected } );
    
            NotificationSuccess( type.notificationMessages.insumoUpdated );
    
            removeFromLocalStorage( type.localStorage.establishments );

        } else {

            NotificationError( type.notificationMessages.insumoUpdatedError );
            NotificationError( response.msg );

        }
        
    } catch (error) {
        
        NotificationError( type.notificationMessages.insumoUpdatedError );
        console.log( 'Error al actualizar insumo: ', data.name, error );
    } finally {

        dispatch( endLoading() );
    }
    
}