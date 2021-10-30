import { type } from "../constant/type";

export const newInsmoInitialState = {
    data: {
        name: '',
        price: {},
        labels: []
    },
    isEditing: false
};

export const newInsumoReducer = ( state = newInsmoInitialState, action ) => {

    const opts = {
        [type.newInsumo.fill]: () => ({ ...state, data: { ...state.data, ...action.payload } }),
        [type.newInsumo.reset]: () => ({ ...newInsmoInitialState }),
        [type.newInsumo.update]: () => ({ ...state, data: action.payload, isEditing: true })
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;

}