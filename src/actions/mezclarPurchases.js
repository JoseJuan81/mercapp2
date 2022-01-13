import { isEmpty } from "functionallibrary";

import { type } from "../constant/type";

import { getPurchasesFromLocalStorage } from "../helper/getPurchasesFromLocalStorage";
import { getFromLocalStorage } from "../helper/localStorage";

import { endLoading, startLoading } from "./loadingAction";
import { selectMultiPurchases } from "./purchasesAction";

/// ============= Acciones sincronas ================= //

/// ============= Acciones asincronas ================= //
export const startLoadingPurchases = ids => dispatch => {

    dispatch( startLoading() )

    const localPurchases = getFromLocalStorage( type.localStorage.purchases );

    if ( isEmpty( localPurchases ) ) {

        console.log('consultar a la base de datos')
    } else {

        const purchases = getPurchasesFromLocalStorage( ids, localPurchases );
        
        dispatch( selectMultiPurchases( purchases ) );
    }

    dispatch( endLoading() )
}