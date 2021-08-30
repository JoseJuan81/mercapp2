import { newInsumoForm, newInsumoTypeForm } from "../constant/newInsumoTypeForm";

export const newInsumoReducer = ( state = newInsumoTypeForm, action ) => {

    const opts = {
        [newInsumoForm.fill]: () => ({ ...state, ...action.payload }),
        [newInsumoForm.reset]: () => ({ ...newInsumoTypeForm })
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;

}