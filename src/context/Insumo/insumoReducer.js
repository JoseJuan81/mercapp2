import { equality, find, removeItemFromArrayByProp } from 'functionallibrary';
import {
    onFilter,
    onSearch,
    selectAllInsumos,
    unSelectAllInsumos,
    updateItemInArrayById
} from '../../helper/helperInsumoContext';

const handleQuantityChange = ( state, action ) => {

    const { payload: { id, quantity } } = action;

    const insumo = find( equality('id', id), state );
    return updateItemInArrayById( state, { ...insumo, quantity } );
}

const handleRemoveInsumo = ( state, id ) => {

    const insumos = removeItemFromArrayByProp( 'id', id, state);

    return [...insumos];
}

export const insumoReducer = (state, action) => {

    const opts = {
        add: () => [action.payload, ...state],
        toogle: () => updateItemInArrayById(state, action.payload),
        'quantity-change': () => handleQuantityChange( state, action ),
        'select-all': () => selectAllInsumos( state ),
        'unselect-all': () => unSelectAllInsumos( state ),
        search: () => onSearch( state, action.payload ),
        'restore-insumos': () => action.payload,
        filter: () => onFilter( state, action.payload ),
        remove: () => handleRemoveInsumo( state, action.payload ),
        update: () => updateItemInArrayById(state, action.payload),
        'update-with-local-storage': () => action.payload,
    }

    const actionToExe = opts[action.type];

    return typeof actionToExe === 'function' ? actionToExe() : state;
}