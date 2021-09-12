import { equality, findIndex } from "functionallibrary";

/**
 * @description actualizar un arreglo con los elementos del otro
 * @param {array} arrayToUpdate - arreglo a actualizar
 * @param {array} arrayUpdated - arreglo con elementos actualizados
 * @param {string} prop - propiedad a usar para coincidencia entre elementos
 */
export const updateArrayWithArray = ( arrayToUpdate, arrayUpdated, prop ) => {
    
    const local = [...arrayToUpdate];

    arrayUpdated.forEach( item => {
        const { id } = item;

        const index = findIndex( equality( prop, id ), arrayToUpdate );
        if ( index > -1 ) {

            local.splice( index, 1, item );
        } else {

            local.push( item );
        }
    })

    return [...local];
}
