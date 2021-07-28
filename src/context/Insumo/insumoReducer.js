import { removeItemFromArrayByProp } from "functionallibrary";
import { onFilter, onSearch, unSelectAllInsumos, updateItemInArrayById } from "../../helper/helperInsumoContext";

export const insumoReducer = (state, action) => {

    const opts = {
        add: () => [action.payload, ...state],
        toogle: () => updateItemInArrayById(state, action.payload),
        'quantity-change': () => updateItemInArrayById(state, action.payload),
        'select-all': () => action.payload,
        'unselect-all': () => unSelectAllInsumos( state ),
        search: () => onSearch( state, action.payload ),
        'restore-insumos': () => action.payload,
        filter: () => onFilter( state, action.payload ),
        remove: () => removeItemFromArrayByProp( 'id', action.payload, state),
        update: () => updateItemInArrayById(state, action.payload),
        'update-with-local-storage': () => action.payload,
    }

    const actionToExe = opts[action.type];

    return typeof actionToExe === 'function' ? actionToExe() : state;
}