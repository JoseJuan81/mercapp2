import { type } from "../constant/type";

const inicialState = {
    amount: 0,
    category: { name: '' },
    date: '',
    description: '',
    establishment: { name: '' },
    items: []
}

export const newExpenseReducer = ( state = inicialState, action ) => {

    const opts = {
        [type.newExpense.update]: () => ({ ...state, ...action.payload }) 
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;
}