import { compose, decide, equality, filter, find, findIndex, isEmpty, map, reduce, round, setNewProperty } from 'functionallibrary';

import { alphabeticSorting } from './alphabeticSorting';
import { getFromLocalStorage } from './localStorage';

// import dataInsumos from '../fakeData/insumos';

const twoDecimals = round(2);

export const updateTotal = ( selectedInsumos ) => {

    if ( selectedInsumos.length < 1) {
        return 0;
    }

    return selectedInsumos.reduce((acc, item) => {
        const { quantity, price } = item;
        const totalInsumo = twoDecimals((quantity * price) || 0);

        return (acc + totalInsumo);
    }, 0);

}

export const updatingQuantity = ( id, quantity, selectedInsumos ) => {

    const updateFn = (list, item) => {

        if (id === item.id) {
            return list.concat( setNewProperty('quantity', quantity, item) );
        }

        return list.concat(item);
    }

    return reduce(updateFn, [], selectedInsumos);
}

export const initialInsumos = ( dataInsumos ) => {

    const dataSelected = getFromLocalStorage('selected-insumos');

    if (!dataSelected || dataSelected.length === 0) {
        return alphabeticSorting(dataInsumos);
    }
    
    const reduceManage = (list, item) => {

        const isChecked = find( equality('id', item.id), dataSelected );

        const addChecked = () => list.concat(isChecked);
        const addNotChecked = (el) => list.concat(el);

        return decide(!!isChecked, addChecked, addNotChecked, item);

    }

    const updatedInsumos = reduce(reduceManage, [], dataInsumos);
    return alphabeticSorting(updatedInsumos);
}

export const selectAllInsumos = (state) => {

    const setCheckAndQuantity = compose(
        setNewProperty('checked', true),
        setNewProperty('quantity', 1)
    )
    return map(setCheckAndQuantity, state);
}

export const unSelectAllInsumos = (state) => {
    const unChecked = setNewProperty('checked', false);
    return map(unChecked, state);
}

export const updateItemInArrayById = (state, insumo) => {

    const indexInState = findIndex(
        equality('id', insumo.id),
        state
    )
    const local = [...state];
    local.splice(indexInState, 1, insumo);

    return [...local];
}

export const onSearch = (state, searchVal) => {

    return filter(
        i => i.title.toLowerCase().includes( searchVal.toLowerCase() ),
        state
    );
}

export const onFilter = (state, searchVal) => {

    if(searchVal === '' || searchVal === null || searchVal === undefined) {
        return state;
    }

    return state.filter( (i) => {

        const { labels } = i;

        if ( isEmpty(labels) ) {
            return false;
        }

        const exist = labels.find(l => l.toLowerCase().includes(searchVal.toLowerCase()));
        return !!exist;
    });
}

export const onReset = (initialState) => [...initialState];

export const addNewInsumo = (state, newInsumo) => {
    return [newInsumo, ...state];
}