import { equality, filter, find, removeItemFromArrayByProp } from "functionallibrary";

import { type } from "../constant/type";

import { fetchCreatePurchase } from "../helper/fetch";
import { getFromLocalStorage, removeFromLocalStorage, updateInsumoInLocalStorage } from "../helper/localStorage";
import { NotificationError, NotificationSuccess } from "../helper/toast";
import { updateItemInArrayByProp } from "../helper/updateItemInArrayByProp";
import { updateInsumosToBuyWithSelected } from "../helper/updateArrayWithArray";

import { selectAllInsumosToBuy } from "./insumosAction";
import { endLoading, startLoading } from "./loadingAction";
import { initialState } from "../reducers/newPurchaseReducer";
import { dateWithTime } from "../helper/dates";

/// ============= Acciones sincronas ================= //
export const selectedInsumos = ( allInsumos ) => ({
    type: type.newPurchase.selected,
    payload: allInsumos
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

export const updateNewPurchase = ( newPurchaseData ) => ({
    type: type.newPurchase.update,
    payload: newPurchaseData
})

export const setEstablishmentInBuy = ( name ) => dispatch => {

    dispatch( updateNewPurchase({ establishmentName: name }) );
}

export const setNameInBuy = ( name ) => dispatch => {

    dispatch( updateNewPurchase({ name }) );
}

export const setBuyDate = ( date ) => dispatch => {

    dispatch( updateNewPurchase({ purchaseDate: date }) );
}

export const loadSelectedInsumos = () => dispatch => {

    const allInsumos = getFromLocalStorage( type.localStorage.insumos ) || [];

    const filterSelected = filter( equality('selected', true), allInsumos );
    dispatch( selectedInsumos( filterSelected ) );
}

export const loadPurchasesData = () => dispatch => {

    const currentPurchase = getFromLocalStorage( type.localStorage.newPurchase );
    const allInsumos = getFromLocalStorage( type.localStorage.insumos );

    if ( currentPurchase ) {
        const selectedInumos = filter( equality( 'selected', true ), allInsumos );
        const matchSelectedInsumos = updateInsumosToBuyWithSelected( currentPurchase.insumos, selectedInumos );
        dispatch( updateNewPurchase( { ...currentPurchase, insumos: matchSelectedInsumos } ) );
    } else {
        dispatch( loadSelectedInsumos() );
    }
}

export const startUpdatingQuantity = ( { id, quantity } ) => ( dispatch, rootState ) => {

    const { newPurchase: { insumos } } = rootState();
    const thisInsumo = find( equality( 'id', id ), insumos );

    dispatch( updatingInsumosQuantity( { ...thisInsumo, quantity } ) );
}

export const clearInsumosToBuy = () => dispatch => {

    dispatch( startLoading() );
    dispatch( cleaningNewPurchase() );
    dispatch( selectAllInsumosToBuy( false ) );

    setTimeout(() => {

        dispatch( endLoading() );
    }, 700)
}

export const updateInsumoPriceOnBuying = ({ id, newPrice }) => ( dispatch, rooState ) => {

    const { newPurchase } = rooState();
    const { establishmentName, insumos } = newPurchase;

    const insumoToUpdate = find( equality( 'id', id ), insumos );
    const insumoUpdated = { ...insumoToUpdate, price: { ...insumoToUpdate.price, [establishmentName.toLowerCase()]: Number( newPrice ) } };
    const insumosToBuyUpdated = updateItemInArrayByProp('id', insumoUpdated, insumos);
    dispatch( updateNewPurchase( { ...newPurchase, insumos: insumosToBuyUpdated } ) );
}

export const cleaningNewPurchase = () => dispatch => {

    removeFromLocalStorage( type.localStorage.newPurchase );
    dispatch( updateNewPurchase( initialState ) );
}

/// ============= Acciones Asincronas ================= //
export const startCreatingPurchase = () => async ( dispatch, rootState ) => {

    dispatch( startLoading() );

    const { newPurchase } = rootState();

    try {

        const { purchaseDate } = newPurchase;
        const formattedDate = dateWithTime( purchaseDate );
        const response = await fetchCreatePurchase({ ...newPurchase, purchaseDate: formattedDate } );

        dispatch( createPurchase( response.data ) );
        dispatch( selectAllInsumosToBuy( false ) );

        removeFromLocalStorage( type.localStorage.purchases );

        NotificationSuccess( type.notificationMessages.newPurchaseCreated );
        
    } catch (error) {
        NotificationError( type.notificationMessages.newPurchaseCreatedError );
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

    NotificationSuccess( type.notificationMessages.newPurchaseInsumoRemoved );

    dispatch( endLoading() );

}