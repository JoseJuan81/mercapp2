import { equality, find } from "functionallibrary";
import { typeBuy } from "../constant/buy";
import { typeLocal } from "../constant/localStorage";
import { getFromLocalStorage, updateInsumoInLocalStorage } from "../helper/localStorage";

/// ============= Acciones sincronas ================= //
export const loadSelectedInsumos = () => ({
    type: typeBuy.selected
})

export const setEstablishmentInBuy = ( name ) => ({
    type: typeBuy.establishment,
    payload: name
})

export const updatingInsumosQuantity = ( updatedInsumo ) => ({
    type: typeBuy.updateQuantity,
    payload: updatedInsumo
})

export const startUpdatingQuantity = ( { id, quantity } ) => ( dispatch ) => {

    const selectedInsumos = getFromLocalStorage( typeLocal.insumos );
    const thisInsumo = find( equality( 'id', id ), selectedInsumos );

    dispatch( updatingInsumosQuantity( { ...thisInsumo, quantity } ) );
    updateInsumoInLocalStorage( { ...thisInsumo, quantity } );
}

/// ============= Acciones Asincronas ================= //