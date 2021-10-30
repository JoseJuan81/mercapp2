import { type } from "../constant/type"

const initialState = {
    isFiltering: false,
    isSearching: false,
    showField: false
}

export const searchInsumosReducer = ( state = initialState, action ) => {

    const opts = {
        [type.search.showSearch]: () => ({ showField: true, isSearching: true, isFiltering: false }),
        [type.search.showFilter]: () => ({ showField: true, isFiltering: true, isSearching: false }),
        [type.search.hide]: () => ({ showField: false, isFiltering: false, isSearching: false })
    }

    const fn = opts[action.type];

    return typeof fn === 'function' ? fn() : state;
}