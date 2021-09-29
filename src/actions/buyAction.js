import { equality, find } from "functionallibrary";
import { typeBuy } from "../constant/buy";
import { typeLocal } from "../constant/localStorage";
import { getFromLocalStorage, updateInsumoInLocalStorage } from "../helper/localStorage";

/// ============= Acciones sincronas ================= //
export const selectedInsumos = ( allInsumos ) => ({
    type: typeBuy.selected,
    payload: allInsumos
})

export const settingEstablishmentName = ( name ) => ({
    type: typeBuy.establishment,
    payload: name
})

export const updatingInsumosQuantity = ( updatedInsumo ) => ({
    type: typeBuy.updateQuantity,
    payload: updatedInsumo
})

export const totalBuy = () => ({
    type: typeBuy.total
})

export const setEstablishmentInBuy = ( name ) => dispatch => {

    dispatch( settingEstablishmentName( name ) );
    dispatch( totalBuy() );
}

export const loadSelectedInsumos = () => dispatch => {

    const allInsumos = getFromLocalStorage( typeLocal.insumos ) || [];
    dispatch( selectedInsumos( allInsumos ) );
    dispatch( totalBuy() );
}

export const startUpdatingQuantity = ( { id, quantity } ) => ( dispatch ) => {

    const selectedInsumos = getFromLocalStorage( typeLocal.insumos );
    const thisInsumo = find( equality( 'id', id ), selectedInsumos );

    dispatch( updatingInsumosQuantity( { ...thisInsumo, quantity } ) );
    dispatch( totalBuy() );
    updateInsumoInLocalStorage( { ...thisInsumo, quantity } );
}

/// ============= Acciones Asincronas ================= //