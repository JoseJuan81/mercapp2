import { isEmpty, reduce, round } from "functionallibrary";

const twoDecimals = round(2);

export const calculateTotal = ( itemsArray, name ) => {

    if ( itemsArray.length === 0 ) {
        return 0
    }

    const lowerName = name.toLowerCase();
    const totalFn = ( acc, { price, quantity } ) => {
        const p = isEmpty( price ) ? 0 : ( price[lowerName] || 0 );
        const q = quantity || 1;
        const total = p * q;
        return acc + total;
    }

    const result = reduce( totalFn, 0, itemsArray );
    return twoDecimals( result );
}

export const calculateSimpleTotal = ( eles, prop ) => {
    return twoDecimals(
        reduce(
            ( acc, item ) => acc + item[prop],
            0,
            eles
        )
    )
}
