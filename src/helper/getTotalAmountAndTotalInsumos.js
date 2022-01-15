import { getPropertysValue, reduce, round } from "functionallibrary";

const twoDecimals = round( 2 );
const accumulator = { totalAmount: 0, totalInsumos: 0 };

export const getTotalAmountAndTotalInsumos = ( arr ) => {
    
    const total = getPropertysValue( 'total' );
    const getInsumos = getPropertysValue( 'insumos' );

    const calculate = ( acc, item ) => {
        const val = total( item );
        const totalInsumos = getInsumos( item );

        return {
            totalInsumos: twoDecimals( acc.totalInsumos + totalInsumos.length ),
            totalAmount: twoDecimals( acc.totalAmount + val )
        }
    }

    return reduce( calculate, accumulator, arr )
}