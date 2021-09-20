
import { equality, find, isEmpty } from "functionallibrary";

import { db } from "../firebase/firebase-config";
import { newInsumoForm } from "../constant/newInsumoTypeForm";
import { priceFromArrayToObject } from "../helper/utils";
import { addInsumoToState, updateInsumoInState } from "./insumosAction";
import { endLoading, startLoading } from "./loadingAction";
import { getFromLocalStorage, updateInsumoInLocalStorage } from "../helper/localStorage";
import { typeLocal } from "../constant/localStorage";
// import { createInsumoInLocal } from "../helper/indexDB";
// import IDB from "../services/indexDB/insumo";

// const idb = new IDB('insumos');


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
    const { auth: { uid }, newInsumo: { data } } = rootState();

    const insumoCreated = await db.collection( `${ uid }/app/insumos` ).add( data );
    
    dispatch( addInsumoToState( { ...data, id: insumoCreated.id } ) );
    // createInsumoInLocal( { ...newInsumo, id: insumoCreated.id });
    dispatch ( resetForm() );
    dispatch( endLoading() );

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

    const { auth: { uid }, newInsumo: { data } } = rootState();

    const { id, selected, ...rest } = data;

    await db.doc( `${ uid }/app/insumos/${ id }` ).update( rest );
    
    dispatch( updateInsumoInState( data ) );
    dispatch ( resetForm() );
    dispatch( endLoading() );
    
    updateInsumoInLocalStorage( { ...data, selected } );
}