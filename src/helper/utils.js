import { equality, findIndex, isEmpty, round } from 'functionallibrary';

const twoDecimals = round(2);

export const updateItemInArrayByProp = (prop, item, arr) => {
    const index = findIndex(
        equality(prop, item[prop]),
        arr
    )

    const local = [...arr];
    local.splice( index, 1, item );

    return local;
}

export const defaultObjectPrice = { name: '', value: 0 };

export const priceFromObjectToArray = ( price ) => {

    if ( isEmpty(price) ) {

        return [defaultObjectPrice];

    } else {

        return Object.keys( price ).map(p => ({ name: p, value: twoDecimals( price[p] ) }));

    }
}

export const priceFromArrayToObject = ( arr ) => {

    return arr.reduce( (acc, { name, value } ) => {

        const localAcc = { ...acc };
        localAcc[name.toLowerCase().trim()] = value;

        return localAcc;        
    }, {} )
}

export const extractInsumosFromFirestoreResponse = ( response ) => {

    const insumos = [];
    response.forEach( insumo => {

        insumos.push( { id: insumo.id, ...insumo.data() } );
    })

    return insumos;
}

/**
 * 
 * @param {object} item - elemento a actualizar dentro del arreglo
 * @param {string} prop - propiedad a usar para buscar el item en el arreglo
 * @param {array} state - arreglo de items
 */
export const updateAnItemInArray = ( item, prop, state ) => {

    const index = findIndex(
        equality( prop, item.id ),
        state
    );

    const localState = [...state];
    localState.splice( index, 1, item );

    return [...localState];
}