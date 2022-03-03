import { compose, isEmpty, map, reduce, round, setNewProperty } from "functionallibrary";

import { NO_PRICES_INSUMO } from "../constant/defaults";

const TWODECIMALS = round( 2 );

export const clasifyingInsumosByEstablishment = ( insumos ) => {

    return extractAccValuesByKey( reduce( clasifying, {}, insumos ) );
}

export const clasifying = ( acc, item ) => {

    const { price } = item;

    if ( isEmpty( price ) ) {

        const newItem = setNewProperty( 'price', { NO_PRICES_INSUMO: 0 }, item );
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

export const convertIntoArray = objectPrice => ( keysArray ) => {

    const priceObject = key => ({ name: key, price: objectPrice[key] })

    return map( priceObject, keysArray );
}

export const ascendingOrder = arr => arr.sort((a, b) => a.price - b.price )

export const getFirstEl = arr => arr[0];

export const addIntoAcc = ( accumulator, item ) => ({ name }) => {
    const localAcc = { ...accumulator };
    const exist = localAcc[name];

    if ( exist ) {

        localAcc[name].insumos.push( item );
        localAcc[name].total += TWODECIMALS( item.price[name] );
        
    } else {

        localAcc[name] = { name, insumos: [item], total: TWODECIMALS( item.price[name] ) };
    }

    return localAcc;
}

export const extractAccValuesByKey = ( acc ) => {

    if ( !isEmpty( acc )) {
        
        const { [NO_PRICES_INSUMO]:noPrice, ...rest } = acc;
        return Object.values({ noPrice, ...rest });
    }

    return [];
}

export const noPriceInsumo = ( acc, item ) => {
    
    const localAcc = { ...acc };

    if ( isEmpty( acc[NO_PRICES_INSUMO] ) ) {

        localAcc[NO_PRICES_INSUMO] = { name: NO_PRICES_INSUMO, insumos: [item], total: 0 };
    } else {
        
        localAcc[NO_PRICES_INSUMO] = { name: NO_PRICES_INSUMO, insumos: acc.insumos.push( item ), total: 0 };
    }

    return localAcc;
}