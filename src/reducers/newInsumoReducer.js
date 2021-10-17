import { newInsumoForm } from "../constant/newInsumoTypeForm";

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
        [newInsumoForm.fill]: () => ({ ...state, data: { ...state.data, ...action.payload } }),
        [newInsumoForm.reset]: () => ({ ...newInsmoInitialState }),
        [newInsumoForm.update]: () => ({ ...state, data: action.payload, isEditing: true })
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;

}