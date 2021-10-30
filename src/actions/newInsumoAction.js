
import { equality, find, isEmpty, setNewProperty } from "functionallibrary";

import { addInsumoToState, updateInsumoInState } from "./insumosAction";
import { endLoading, startLoading } from "./loadingAction";

import { getFromLocalStorage, setInLocalStorage, updateInsumoInLocalStorage } from "../helper/localStorage";
import { priceFromArrayToObject } from "../helper/priceHandling";
import { fetchCreateInsumo, fetchInsumo, fetchUpdateInsumo } from "../helper/fetch";

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
        : rootState().insumos;

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

    const { newInsumo: { data }, insumos } = rootState();
    const allInsumos = isEmpty( insumos ) ? localInsumos : insumos;

    try {
        
        const response = await fetchCreateInsumo( data );

        const insumoCreated = setNewProperty('selected', isSelected, response.data );
        dispatch( addInsumoToState( insumoCreated ) );
        setInLocalStorage( type.localStorage.insumos, [insumoCreated, ...allInsumos] );
    
        dispatch ( resetForm() );

    } catch (error) {

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
        
    } catch(err) {

        dispatch( updatingInsumo({}) );
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
        const insumoUpdated = response.data;
    
        dispatch( updateInsumoInState( { ...insumoUpdated, selected } ) );
        dispatch ( resetForm() );
        
        updateInsumoInLocalStorage( { ...insumoUpdated, selected } );
    } catch (error) {

        console.log( 'Error al actualizar insumo: ', data.name, error );
    } finally {

        dispatch( endLoading() );
    }
    
}