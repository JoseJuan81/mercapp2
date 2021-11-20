import { equality, findIndex } from "functionallibrary";

/**
 * @description actualizar un arreglo con los elementos del otro usando el id
 * @param {array} arrayToUpdate - arreglo a actualizar
 * @param {array} arrayUpdated - arreglo con elementos actualizados
 * @param {string} prop - propiedad para buscar elementos
 */
export const updateArrayWithArray = ( arrayToUpdate, arrayUpdated, prop = 'id' ) => {
    
    const local = [...arrayToUpdate];

    arrayUpdated.forEach( item => {

        const index = findIndex( equality( prop, item[prop] ), arrayToUpdate );
        if ( index > -1 ) {

            local.splice( index, 1, item );
        } else {

            local.push( item );
        }
    })

    return [...local];
}

/**
 * @description actualizar un arreglo agregando o removiendo elementos.
 * @param {array} baseArray - arreglo base ( a quien se le agrega o remueven elementos )
 * @param {array} partnerArray - arreglo con elementos ( quien suministra los elementos nuevos o informa para eliminar elementos del baseArray)
 * @param {string} prop - propiedad para buscar elementos
 */
export const updateInsumosToBuyWithSelected = ( baseArray, partnerArray, prop = 'id' ) => {

    const finalArray = [];

    partnerArray.forEach( item => {

        const index = findIndex( equality( prop, item[prop] ), baseArray );
        const itemToAdd = index === -1 ? item : baseArray[index];
        finalArray.push( itemToAdd );

    })

    return finalArray;
}
