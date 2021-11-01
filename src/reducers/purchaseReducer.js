import { removeItemFromArrayByProp } from "functionallibrary";
import { type } from "../constant/type";

const initialState = {
    list: [],
    selected: [],
}

export const purchasesReducer = ( state = initialState, action ) => {

    const opts = {
        [type.purchases.getAll]: () => ({ ...state, list: action.payload }),
        [type.purchases.select]: () => ({
            ...state,
            selected: state.selected.concat( action.payload )
        }),
        [type.purchases.unselect]: () => ({
            ...state,
            selected: removeItemFromArrayByProp( 'id', action.payload, state.selected )
        }),
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;
}