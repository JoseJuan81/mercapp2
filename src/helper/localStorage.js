import { removeItemFromArrayByProp } from "functionallibrary";
import { typeLocal } from "../constant/localStorage";
import { updateItemInArrayByProp } from "./utils";

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

    const localInsumos = getFromLocalStorage( typeLocal.insumos );
    const localInsumosUpdated = removeItemFromArrayByProp( 'id', id, localInsumos );

    setInLocalStorage( typeLocal.insumos, localInsumosUpdated );
}

export const updateInsumoInLocalStorage = ( insumo ) => {

    const localInsumos = getFromLocalStorage( typeLocal.insumos );
    const localInsumosUpdated = updateItemInArrayByProp( 'id', insumo, localInsumos );

    setInLocalStorage( typeLocal.insumos, localInsumosUpdated );
}
