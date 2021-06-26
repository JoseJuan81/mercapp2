import { equality, findIndex, map, setNewProperty } from 'functionallibrary';

export const selectAllInsumos = (state) => {
    const checked = setNewProperty('checked', true);
    return map(checked, state);
}

const unSelectAllInsumos = (state) => {
    const unChecked = setNewProperty('checked', false);
    return map(unChecked, state);
}

const onToogleCheck = (state, insumo) => {
    const { title, checked } = insumo;
    const indexInState = findIndex(
        equality('title', title),
        state
    )
    const updatedInsumo = setNewProperty('checked', !checked, insumo);
    const local = [...state];
    local.splice(indexInState, 1, updatedInsumo);

    return [...local];
}

const onSearch = (state, searchVal) => {

    if(searchVal === '' || searchVal === null) {
        return state;
    }

    return state.filter(i => i.title.toLowerCase().includes(searchVal.toLowerCase()));
}

const onReset = (initialState) => [...initialState];

export const insumoReducer = (state, action) => {

    const reducerOptions = {
        selectAll: () => selectAllInsumos(state),
        unSelectAll: () => unSelectAllInsumos(state),
        toogleCheck: () => onToogleCheck(state, action.payload),
        search: () => onSearch(state, action.payload),
        reset: () => onReset(action.payload),
    }

    const fn = reducerOptions[action.type];
    return typeof fn === 'function' ? fn.call() : state;
}