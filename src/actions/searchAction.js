import { type } from "../constant/search";

export const showSearchField = () => ({
    type: type.showSearch
});

export const hideSearchAndFilterField = () => ({
    type: type.hide
});

export const showFilterField = () => ({
    type: type.showFilter
});