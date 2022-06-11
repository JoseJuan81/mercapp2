import { compose, isEmpty, map, reduce, round, setNewProperty } from "functionallibrary";
import { curry, prop, sortBy, toLower } from 'ramda';

import { NO_PRICES_INSUMO } from "../constant/defaults";

const TWODECIMALS = round( 2 );

export const clasifyingInsumosByEstablishment = ( insumos ) => {

    return extractAccValuesByKey( reduce( clasifying, {}, insumos ) );
}

export const clasifying = ( acc, item ) => {

    const { price } = item;

    if ( isEmpty( price ) ) {

        const newItem = setNewProperty( 'price', { [NO_PRICES_INSUMO]: 0 }, item );
        return noPriceInsumo( acc, newItem );
    }

    const pricesKeys = Object.keys( price );

    return compose(
        addIntoAcc( acc, item ),
        getFirstEl,
        ascendingOrder,
        convertIntoArray( price )
    )( pricesKeys )

}

export const convertIntoArray = curry(( objectPrice, keysArray ) => {

    const priceObject = key => ({ name: key, price: objectPrice[key] })
    return map( priceObject, keysArray );
})

export const ascendingOrder = arr => arr.sort((a, b) => a.price - b.price )

export const getFirstEl = arr => arr[0];

export const addIntoAcc = curry(( accumulator, item, { name }) => {
    const localAcc = { ...accumulator };
    const exist = localAcc[name];

    if ( exist ) {

        localAcc[name].insumos.push( item );

        const total = localAcc[name].total + item.price[name];
        localAcc[name].total = TWODECIMALS( total );
        
    } else {

        localAcc[name] = { name, insumos: [item], total: TWODECIMALS( item.price[name] ) };
    }

    return localAcc;
})

export const extractAccValuesByKey = ( acc ) => {

    if ( !isEmpty( acc )) {
        
        const { [NO_PRICES_INSUMO]:noPrice, ...rest } = acc;
        const values = isEmpty( noPrice ) ? Object.values({ ...rest }) : Object.values({ noPrice, ...rest });
        const alphabeticOrder = sortBy( compose( toLower, prop('name') ), values );
        return alphabeticOrder;
    }

    return [];
}

export const noPriceInsumo = ( acc, item ) => {
    
    const localAcc = { ...acc };
    const defaultNoPrice = { name: NO_PRICES_INSUMO, total: 0 };

    if ( isEmpty( acc[NO_PRICES_INSUMO] ) ) {

        localAcc[NO_PRICES_INSUMO] = { ...defaultNoPrice, insumos: [item] };
    } else {
        
        localAcc[NO_PRICES_INSUMO] = { ...defaultNoPrice, insumos: acc.insumos.concat( item ) };
    }

    return localAcc;
}