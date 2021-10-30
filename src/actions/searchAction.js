import { type } from "../constant/type";

export const showSearchField = () => ({
    type: type.search.showSearch
});

export const hideSearchAndFilterField = () => ({
    type: type.search.hide
});

export const showFilterField = () => ({
    type: type.search.showFilter
});