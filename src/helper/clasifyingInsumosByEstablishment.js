import { compose, map, reduce, round } from "functionallibrary";

const TWODECIMALS = round( 2 );

export const clasifyingInsumosByEstablishment = ( insumos ) => {

    return extractAccValuesByKey( reduce( clasifying, {}, insumos ) );
}

export const clasifying = ( acc, item ) => {

    const { price } = item;
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

export const extractAccValuesByKey = ( acc ) => Object.values( acc );