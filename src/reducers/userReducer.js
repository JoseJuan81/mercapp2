import { removeItemFromArrayByProp } from "functionallibrary";
import { concat } from "lodash";

import { type } from "../constant/type";
import { updateItemInArrayByProp } from "../helper/arrayUtils";

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
        [type.user.addExpense]: () => ({ ...state, expenses: concat( state.expenses, action.payload ) }),
        [type.user.deleteExpense]: () => ({
            ...state,
            expenses: removeItemFromArrayByProp( '_id', action.payload )( state.expenses )
        }),
        [type.user.updateExpense]: () => ({
            ...state,
            expenses: updateItemInArrayByProp( '_id', action.payload, state.expenses )
        })
    }

    const fn = opts[ action.type ];
    return typeof fn === 'function' ? fn() : state;
}