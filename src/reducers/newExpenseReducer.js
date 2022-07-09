import { type } from "../constant/type";

const inicialState = {
    amount: '',
    category: '',
    date: '',
    description: '',
    establishment: '',
    items: []
}

export const newExpenseReducer = ( state = inicialState, action ) => {

    const opts = {
        [type.newExpense.update]: () => ({ ...state, ...action.payload }) 
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;
}