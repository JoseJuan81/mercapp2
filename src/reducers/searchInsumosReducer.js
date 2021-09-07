import { type } from "../constant/search"

const initialState = {
    isFiltering: false,
    isSearching: false,
    showField: false
}

export const searchInsumosReducer = ( state = initialState, action ) => {

    const opts = {
        [type.showSearch]: () => ({ showField: true, isSearching: true, isFiltering: false }),
        [type.showFilter]: () => ({ showField: true, isFiltering: true, isSearching: false }),
        [type.hide]: () => ({ showField: false, isFiltering: false, isSearching: false })
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;
}