import { equality, findIndex, isEmpty } from 'functionallibrary';

export const updateItemInArrayByProp = (prop, item, arr) => {
    const index = findIndex(
        equality(prop, item[prop]),
        arr
    )

    const local = [...arr];
    local.splice( index, 1, item );

    return local;
}

export const priceFromObjectToArray = ( price ) => {

    if ( isEmpty(price) ) {

        return [{ name: '', value: 0 }];

    } else {

        return Object.keys( price ).map(p => ({ name: p, value: price[p] }));

    }
}

export const extractInsumosFromFirestoreResponse = ( response ) => {

    const insumos = [];
    response.forEach( insumo => {
        insumos.push( insumo.data() );
    })

    return insumos;
}