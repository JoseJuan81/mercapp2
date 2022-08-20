import { type } from "../constant/type";
import { dataListFormatDate } from "../helper/dates";

const initialState = {
    amount: 0,
    category: { name: '' },
    date: dataListFormatDate( Date.now() ),
    description: '',
    establishment: { name: '' },
    items: []
}

export const newExpenseReducer = ( state = initialState, action ) => {

    const opts = {
        [type.newExpense.update]: () => ({ ...state, ...action.payload }),
        [type.newExpense.reset]: () => ({ ...initialState})
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;
}