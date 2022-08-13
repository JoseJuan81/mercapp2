import { always, cond, prop, propEq, T } from "ramda";
import { type } from "../constant/type";

import { userFetch } from "../helper/fetch/userFetch";
import { clearLocalStorage } from "../helper/localStorage";
import { appLogout } from "./authAction";

import { endLoading, startLoading } from "./loadingAction";

/// ============= Acciones sincronas ================= //
export const resetUserState = () => ({
    type: type.user.logout
});

export const updateUserData = ( userData ) => ({
    type: type.user.update,
    payload: userData
});

export const updateExpensesInUser = ( expense ) => ({
    type: type.user.addExpense,
    payload: expense
});

export const deleteExpenseFromUser = ( expenseId ) => ({
    type: type.user.deleteExpense,
    payload: expenseId
});

/// ============= Acciones asincronas ================= //
export const fetchingUserData = () => async dispatch => {

    dispatch( startLoading() );
    try {
        
        const res = await userFetch.data();

        if (res.ok) {
            dispatch( updateUserData( res.data ));
        } else {
            didNotGetUserData( res );
        }

    } catch (error) {

        console.log('No se obtuvo la información del usuario', error);
        clearLocalStorage();
        dispatch( appLogout() );

    } finally {

        dispatch( endLoading() );

    }
}

/// ========== Funciones locales ========== //
const didNotGetUserData = ( res ) => {
    return console.error('Error al obtener datos del usuario', res.msg)
}