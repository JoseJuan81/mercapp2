import { cond, prop, propEq, T } from "ramda";
import { type } from "../constant/type";

import { userFetch } from "../helper/fetch/userFetch";
import { clearLocalStorage } from "../helper/localStorage";
import { logout } from "./authAction";

import { endLoading, startLoading } from "./loadingAction";

const didNotGetUserData = ( res ) => {
    return console.error('Error al obtener datos del usuario', res.msg)
}

/// ============= Acciones sincronas ================= //
export const resetUserState = () => ({
    type: type.user.logout
});

export const updateUserData = ( userData ) => ({
    type: type.user.update,
    payload: userData
});

/// ============= Acciones asincronas ================= //
export const fetchingUserData = () => async dispatch => {

    dispatch( startLoading() );
    try {
        
        const res = await userFetch.data();

        cond([
            [propEq('ok', true), () => dispatch( updateUserData( prop('data') ))],
            [T, didNotGetUserData]
        ])(res)

    } catch (error) {

        console.log('No se obtuvo la información del usuario', error);
        clearLocalStorage();
        dispatch( logout() );

    } finally {

        dispatch( endLoading() );

    }
}