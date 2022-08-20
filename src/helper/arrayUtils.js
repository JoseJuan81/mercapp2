import { equality, findIndex } from "functionallibrary";
import { curry } from "ramda";

/**
 * Actualizar elemento dentro de un arreglo
 * @param {string} prop - propiedad a usar para ubicar elemento dentrod e arreglo
 * @param {object} item - elemento actualizado
 * @param {array} arr - arreglo de elementos
 * 
 * @return {array} array
 */
export const updateItemInArrayByProp = ( prop, item, arr ) => {

    const index = findIndex( equality(prop, item[prop]), arr );

    const local = [...arr];
    local.splice( index, 1, item );

    return [...local];
}