import { type } from "../constant/type";

import { absDate } from "../helper/dates";
import { fetchExpense } from "../helper/fetch/fetchExpense";
import { removeFromLocalStorage } from "../helper/localStorage";


import { endLoading, startLoading } from "./loadingAction";

import { updateExpensesInUser } from "./userAction";

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
    const { newExpense } = rootState();

    try {

        const body = { ...newExpense, date: absDate( newExpense.date ) }
        const expenseCreated = await fetchExpense.new( body );
        dispatch( clearNewExpenseData() );
        dispatch( updateExpensesInUser( expenseCreated.data ) );

        removeFromLocalStorage( type.localStorage.newExpense );

    } catch ( err ) {

        console.log( 'error creando nuevo gasto', err );

    } finally {

        dispatch( endLoading() );
    }
}