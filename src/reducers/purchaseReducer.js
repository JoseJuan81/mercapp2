import { type } from "../constant/type";

const initialState = {
    list: [],
}

export const purchasesReducer = ( state = initialState, action ) => {

    const opts = {
        [type.purchases.getAll]: () => ({ ...state, list: action.payload })
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;
}