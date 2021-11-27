import { type } from "../constant/type";

import { calculateTotal } from "../helper/calculateTotal";
import { updateItemInArrayByProp } from "../helper/updateItemInArrayByProp";

export const initialState = {
    closed: false,
    establishmentName: '',
    id: '',
    insumos: [],
    name: '',
    purchaseDate: '',
    total: 0,
}

export const newPurchaseReducer = ( state = initialState, action ) => {
    
    const opts = {
        [type.newPurchase.selected]: () => ({
            ...state,
            insumos: [...action.payload]
        }),
        [type.newPurchase.updateQuantity]: () => ({
            ...state,
            insumos: updateItemInArrayByProp( 'id', action.payload, state.insumos )
        }),
        [type.newPurchase.total]: () => ({
            ...state,
            total: calculateTotal( state.insumos, state.establishmentName )
        }),
        [type.newPurchase.createBuy]: () => ({ ...state, ...action.payload }),
        [type.newPurchase.update]: () => ({ ...state, ...action.payload })
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;
}
