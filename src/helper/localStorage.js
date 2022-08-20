import { removeItemFromArrayByProp } from "functionallibrary";
import { type } from "../constant/type";
import { updateItemInArrayByProp } from "./arrayUtils";

export const getFromLocalStorage = (key) => {
    const ls = localStorage.getItem(key);
    return JSON.parse(ls);
}

export const setInLocalStorage = (key, data) => {
    const dParsed = JSON.stringify(data);
    localStorage.setItem(key, dParsed);
}

export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}

export const clearLocalStorage = () => {
    localStorage.clear();
}

export const removeInsumoFromLocalStorage = ( id ) => {

    const localInsumos = getFromLocalStorage( type.localStorage.insumos );
    const localInsumosUpdated = removeItemFromArrayByProp( 'id', id, localInsumos );

    setInLocalStorage( type.localStorage.insumos, localInsumosUpdated );
}

export const updateInsumoInLocalStorage = ( insumo ) => {

    const localInsumos = getFromLocalStorage( type.localStorage.insumos );
    const localInsumosUpdated = updateItemInArrayByProp( 'id', insumo, localInsumos );

    setInLocalStorage( type.localStorage.insumos, localInsumosUpdated );
}
