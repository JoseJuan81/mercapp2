
import { equality, find, isEmpty } from "functionallibrary";

import { db } from "../firebase/firebase-config";
import { newInsumoForm } from "../constant/newInsumoTypeForm";
import { addInsumoToState, updateInsumoInState } from "./insumosAction";
import { endLoading, startLoading } from "./loadingAction";
import { getFromLocalStorage, setInLocalStorage, updateInsumoInLocalStorage } from "../helper/localStorage";
import { typeLocal } from "../constant/localStorage";
import { priceFromArrayToObject } from "../helper/priceHandling";
import { fetchCreateInsumo, fetchUpdateInsumo } from "../helper/fetch";

/// ============= Acciones sincronas ================= //
export const fillingForm = ( { name, value } ) => {

    const isPrice = name === 'price';

    if ( isPrice ) {

        return {
            type: newInsumoForm.fill,
            payload: {
                [name]: priceFromArrayToObject( value )
            }
        }

    }

    return {
        type: newInsumoForm.fill,
        payload: { [name]: value }
    }
}

export const resetForm = () => ({
    type: newInsumoForm.reset
})

export const updatingInsumo = ( insumo ) => ({
    type: newInsumoForm.update,
    payload: insumo
});

export const setInsumoToUpdate = ( insumoId ) => ( dispatch, rootState ) => {

    const insumos = isEmpty( rootState().insumos )
        ? getFromLocalStorage( typeLocal.insumos )
        : rootState().insumos;

    const insumoToUpdate = find(
        equality( 'id', insumoId ),
        insumos
    );

    dispatch( updatingInsumo( insumoToUpdate ) );
}

/// ============= Acciones asincronas ================= //
export const startCreateInsumo = () => async ( dispatch, rootState ) => {

    dispatch( startLoading() );

    const { newInsumo: { data }, insumos } = rootState();

    try {
        
        const response = await fetchCreateInsumo( data );
        const insumoCreated = response.data;

        dispatch( addInsumoToState( insumoCreated ) );
        setInLocalStorage( typeLocal.insumos, [insumoCreated, ...insumos] );
    
        dispatch ( resetForm() );

    } catch (error) {

        console.error( 'Error al crear insumo ', error);

    } finally {

        dispatch( endLoading() );
    }


}

export const startLoadingInsumoData = ( id ) => async ( dispatch, rootState ) => {

    dispatch( startLoading() );

    const { auth: { uid } } = rootState();

    try {
        const response = await db.doc( `${ uid }/app/insumos/${ id }` ).get();
        const data = response.data();

        dispatch( updatingInsumo( { id: response.id, ...data } ) );
    
    } catch(err) {

        console.log('Error al obtener data del insumo', err)
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