import { auth } from '../constant/auth';

export const initialState = { logged: false };

export const authReducer = ( state = initialState, action ) => {

    const opts = {
        [auth.login]: () => ({ ...action.payload, logged: true }),
        [auth.logout]: () => ({ ...initialState })
    }

    const fn = opts[action.type];
    return typeof fn === 'function' ? fn() : state;
}