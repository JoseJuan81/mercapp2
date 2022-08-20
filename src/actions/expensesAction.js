import { type } from "../constant/type";

import { fetchExpense } from "../helper/fetch/fetchExpense";

import { endLoading, startLoading } from "./loadingAction";

/// ============= Acciones síncronas ================= //
export const deleteExpenseInUser = ( expenseId ) => ({
    type: type.user.deleteExpense,
    payload: expenseId
});

export const editExpenseInUser = ({ expense, index }) => ({
    type: type.user.updateExpense,
    payload: { expense, index }
});


/// ============= Acciones asincronas ================= //
export const startDeletingExpense = ( expenseId ) => async dispatch => {
    
    dispatch( startLoading() );

    try {

        await fetchExpense.delete( expenseId );
        dispatch( deleteExpenseInUser( expenseId ) );

    } catch ( err ) {

        console.log( 'error eliminaddo un gasto', err );

    } finally {

        dispatch( endLoading() );
    }
}

export const startEditingExpense = ( expense, index ) => async dispatch => {
    
    dispatch( startLoading() );

    try {

        await fetchExpense.update( expense );
        dispatch( editExpenseInUser({ expense, index }) );

    } catch ( err ) {

        console.log( 'error eliminaddo un gasto', err );

    } finally {

        dispatch( endLoading() );
    }
}