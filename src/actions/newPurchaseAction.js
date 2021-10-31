import { equality, find, removeItemFromArrayByProp } from "functionallibrary";

import { type } from "../constant/type";

import { fetchCreatePurchase } from "../helper/fetch";
import { getFromLocalStorage, removeFromLocalStorage, updateInsumoInLocalStorage } from "../helper/localStorage";

import { selectAllInsumosToBuy } from "./insumosAction";
import { endLoading, startLoading } from "./loadingAction";

/// ============= Acciones sincronas ================= //
export const selectedInsumos = ( allInsumos ) => ({
    type: type.newPurchase.selected,
    payload: allInsumos
})

export const settingEstablishmentName = ( name ) => ({
    type: type.newPurchase.establishment,
    payload: name
})

export const updatingInsumosQuantity = ( updatedInsumo ) => ({
    type: type.newPurchase.updateQuantity,
    payload: updatedInsumo
})

export const createPurchase = ( newBuy ) => ({
    type: type.newPurchase.createBuy,
    payload: newBuy
})

export const totalBuy = () => ({
    type: type.newPurchase.total
})

export const removeInsumosFromBuy = () => ({
    type: type.newPurchase.clear
})

export const updateNewPurchase = ( newPurchaseData ) => ({
    type: type.newPurchase.update,
    payload: newPurchaseData
})

export const setEstablishmentInBuy = ( name ) => dispatch => {

    dispatch( settingEstablishmentName( name ) );
    dispatch( totalBuy() );
}

export const loadSelectedInsumos = () => dispatch => {

    const allInsumos = getFromLocalStorage( type.localStorage.insumos ) || [];

    dispatch( selectedInsumos( allInsumos ) );
    dispatch( totalBuy() );
}

export const startUpdatingQuantity = ( { id, quantity } ) => ( dispatch ) => {

    const selectedInsumos = getFromLocalStorage( type.localStorage.insumos );
    const thisInsumo = find( equality( 'id', id ), selectedInsumos );

    dispatch( updatingInsumosQuantity( { ...thisInsumo, quantity } ) );
    dispatch( totalBuy() );
    updateInsumoInLocalStorage( { ...thisInsumo, quantity } );
}

export const clearInsumosToBuy = () => dispatch => {

    dispatch( startLoading() );
    dispatch( removeInsumosFromBuy() );
    dispatch( selectAllInsumosToBuy( false ) );

    setTimeout(() => {

        dispatch( endLoading() );
    }, 700)
}

/// ============= Acciones Asincronas ================= //
export const startCreatingPurchase = () => async ( dispatch, rootState ) => {

    dispatch( startLoading() );

    const { newPurchase } = rootState();

    try {
        const response = await fetchCreatePurchase( newPurchase );

        dispatch( createPurchase( response.data ) );
        dispatch( selectAllInsumosToBuy( false ) );

        removeFromLocalStorage( type.localStorage.purchases );

    } catch (error) {
        console.log('Error: creando nueva compra')
    } finally {

        dispatch( endLoading() );
    }
}

export const removeInsumoFromPurchase = ( insumoId ) => async ( dispatch, rooState ) => {

    dispatch( startLoading() );
    const { newPurchase } = rooState();

    if ( newPurchase.id ) {
        // consumir servicio
    }

    // remover insumo de la compra del state
    const newInsumosToBuy = removeItemFromArrayByProp( 'id', insumoId, newPurchase.insumos );
    dispatch( updateNewPurchase( { ...newPurchase, insumos: newInsumosToBuy } ) );

    // actualizar nueva compra en el local storage
    const insumos = getFromLocalStorage( type.localStorage.insumos );
    const thisInsumo = find( equality( 'id', insumoId ), insumos );
    updateInsumoInLocalStorage({ ...thisInsumo, quantity: 0, selected: false });

    dispatch( endLoading() );

}