import { type } from "../constant/type";

const initialState = {
    avatar: '',
    categories: [],
    currencies: [],
    email: '',
    establishments: [],
    expenses: [],
    items: [],
    name: '',
}

export const userReducer = ( state = initialState, action ) => {

    const opts = {
        [type.user.data]: () => state,
        [type.user.update]: () => ({ ...state, ...action.payload }),
        [type.user.logout]: () => ({ ...initialState }),
    }

    const fn = opts[ action.type ];
    return typeof fn === 'function' ? fn() : state;
}