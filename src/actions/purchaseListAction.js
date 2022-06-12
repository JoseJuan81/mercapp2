import { type } from "../constant/type";

import { getFromLocalStorage, setInLocalStorage } from "../helper/localStorage";
import { updateInsumosToBuyWithSelected } from "../helper/updateArrayWithArray";

import { selectAllInsumosToBuy } from "./insumosAction";


/// ============= Acciones sincronas ================= //

/// ============= Acciones Asincronas ================= //
export const createPurchaseFromPurchasesList = newPurchaseData => dispatch => {

    setInLocalStorage( type.localStorage.newPurchase, newPurchaseData );

    dispatch( selectAllInsumosToBuy( false ) );

    const localInsumos = getFromLocalStorage( type.localStorage.insumos );

    const updatedLocalInsumos = updateInsumosToBuyWithSelected( newPurchaseData.insumos, localInsumos );
    setInLocalStorage( type.localStorage.insumos, updatedLocalInsumos );
}