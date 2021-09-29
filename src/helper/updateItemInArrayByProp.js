import { equality, findIndex } from "functionallibrary";

/**
 * Actualizar elemento dentro de un arreglo
 * @param {string} prop - propiedad a usar para ubicar elemento dentrod e arreglo
 * @param {object} item - elemento actualizado
 * @param {array} arr - arreglo de elementos
 */
export const updateItemInArrayByProp = ( prop, item, arr ) => {

    const index = findIndex( equality(prop, item[prop]), arr );

    const local = [...arr];
    local.splice( index, 1, item );

    return [...local];
}