import { user } from "../../constant/user";

export const userReducer = ( state, action ) => {

    const opts = {
        [user.login]: () => ({ ...action.payload, logged: true }),
        [user.logout]: () => ({ logged: true })
    }

    const fn = opts[action.type];
    return typeof fn === 'function' ? fn() : state;
}