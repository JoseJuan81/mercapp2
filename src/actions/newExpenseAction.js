import { type } from "../constant/type";

import { fetchExpense } from "../helper/fetch";

import { endLoading, startLoading } from "./loadingAction";

/// ============= Acciones síncronas ================= //
export const updateNewExpense = ( newExpenseObj ) => ({
    type: type.newExpense.update,
    payload: newExpenseObj
})

export const clearNewExpenseData = () => ({
    type: type.newExpense.reset,
})


/// ============= Acciones asincronas ================= //
export const startCreatingNewExpense = () => async ( dispatch, rootState ) => {
    
    dispatch( startLoading() );

    try {

        await fetchExpense.new( rootState().newExpense );
        dispatch( clearNewExpenseData() );

    } catch ( err ) {

        console.log( 'error creando nuevo gasto', err );

    } finally {

        dispatch( endLoading() );
    }
}