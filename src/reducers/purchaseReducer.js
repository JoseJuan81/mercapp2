import { removeItemFromArrayByProp, setNewProperty } from "functionallibrary";
import { type } from "../constant/type";
import { updateItemInArrayByProp } from "../helper/updateItemInArrayByProp";

const initialState = {
    cache: [],
    list: [],
    selected: [],
}

export const purchasesReducer = ( state = initialState, action ) => {

    const opts = {
        [type.purchases.getAll]: () => ({ ...state, list: action.payload, cache: action.payload }),
        [type.purchases.unselectAll]: () => ({
            ...state,
            list: state.list.map( setNewProperty( 'selected', false ) ),
            selected: []
        }),
        [type.purchases.select]: () => ({
            ...state,
            list: updateItemInArrayByProp( 'id', action.payload, state.list ),
            selected: state.selected.concat( action.payload )
        }),
        [type.purchases.unselect]: () => ({
            ...state,
            list: updateItemInArrayByProp( 'id', action.payload, state.list ),
            selected: removeItemFromArrayByProp( 'id', action.payload, state.selected )
        }),
        [type.purchases.multiSelect]: () => ({ ...state, selected: [].concat( action.payload )})
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;
}