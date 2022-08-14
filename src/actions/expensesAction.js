import { type } from "../constant/type";
import { absDate } from "../helper/dates";

import { fetchExpense } from "../helper/fetch";

import { endLoading, startLoading } from "./loadingAction";

import { deleteExpenseFromUser } from "./userAction";

/// ============= Acciones síncronas ================= //
export const updateNewExpense = ( newExpenseObj ) => ({
    type: type.newExpense.update,
    payload: newExpenseObj
})

export const clearNewExpenseData = () => ({
    type: type.newExpense.reset,
})


/// ============= Acciones asincronas ================= //
export const  startDeletingExpense = ( expenseId ) => async dispatch => {
    
    dispatch( startLoading() );

    try {

        await fetchExpense.delete( expenseId );
        dispatch( deleteExpenseFromUser( expenseId ) );

    } catch ( err ) {

        console.log( 'error eliminaddo un gasto', err );

    } finally {

        dispatch( endLoading() );
    }
}