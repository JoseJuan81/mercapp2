import { newInsumoForm, newInsumoTypeForm } from "../constant/newInsumoTypeForm";

export const newInsumoReducer = ( state = newInsumoTypeForm, action ) => {

    const opts = {
        [newInsumoForm.fill]: () => ({ ...state, data: { ...state.data, ...action.payload } }),
        [newInsumoForm.reset]: () => ({ ...newInsumoTypeForm }),
        [newInsumoForm.update]: () => ({ data: action.payload, isEditing: true })
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;

}