import { type } from '../constant/type';

export const initialState = { logged: false };

export const authReducer = ( state = initialState, action ) => {

    const opts = {
        [type.auth.login]: () => ({ logged: true }),
        [type.auth.logout]: () => ({ logged: false })
    }

    const fn = opts[action.type];
    return typeof fn === 'function' ? fn() : state;
}