import { equality, filter } from "functionallibrary";

import { typeBuy } from "../constant/buy";
import { typeLocal } from "../constant/localStorage";
import { getFromLocalStorage } from "../helper/localStorage";
import { updateItemInArrayByProp } from "../helper/utils";

const initialState = {
    selectedInsumos: [],
    establishmentName: ''
}

const getSelectedInsumos = ( state ) => {

    const allInsumos = getFromLocalStorage( typeLocal.insumos ) || [];
    const selectedInsumos = filter( equality( 'selected', true ), allInsumos );

    return {
        ...state,
        selectedInsumos,
    }
}

export const buyReducer = ( state = initialState, action ) => {
    
    const opts = {
        [typeBuy.selected]: () => getSelectedInsumos( state ),
        [typeBuy.establishment]: () => ({ ...state, establishmentName: action.payload }),
        [typeBuy.updateQuantity]: () => ({
            ...state,
            selectedInsumos: updateItemInArrayByProp( 'id', action.payload, state.selectedInsumos )
        })
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;
}
