import { equality, filter } from "functionallibrary";

import { typeBuy } from "../constant/buy";
import { calculateTotal } from "../helper/calculateTotal";
import { updateItemInArrayByProp } from "../helper/updateItemInArrayByProp";

export const initialState = {
    selectedInsumos: [],
    establishmentName: '',
    total: 0
}

export const buyReducer = ( state = initialState, action ) => {
    
    const opts = {
        [typeBuy.establishment]: () => ({ ...state, establishmentName: action.payload }),
        [typeBuy.selected]: () => ({
            ...state,
            selectedInsumos: filter( equality( 'selected', true ), action.payload )
        }),
        [typeBuy.updateQuantity]: () => ({
            ...state,
            selectedInsumos: updateItemInArrayByProp( 'id', action.payload, state.selectedInsumos )
        }),
        [typeBuy.total]: () => ({
            ...state,
            total: calculateTotal( state.selectedInsumos, state.establishmentName )
        })
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;
}
