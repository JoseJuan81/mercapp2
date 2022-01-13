import { format, getMonth, getYear } from "date-fns";
import { es, enUS } from 'date-fns/locale';

const locale = window.navigator.language.includes('es') ? es : enUS;

export const orderingPurchases = ( list ) => {
    const purchases = list.reduce( ( acc, item ) => {

        const { closed } = item;
        const position = closed ? 1 : 0;
        
        acc[position].push( item )
        return acc;
        
    }, [[], []]);

    return [...purchases[0], ...purchases[1]];
}

export const getPurchasesByMonth = purchases => {
    
    const result = purchases.reduce((month, purchase) => {
        
        const date = new Date( purchase.date );
        const monthNumber = getMonth( date );
        const year = getYear( date );
        const monthName = format( date, 'MMMM', { locale }) + ' ' + year;

        const existIndex = month.findIndex(m => m.number === monthNumber + year);

        if ( existIndex > -1) {

            const thisMonth = month[existIndex];
            thisMonth.purchases = [].concat( purchase, thisMonth.purchases );
            thisMonth.count = thisMonth.count + 1;
            return month;
        } else {

            return month.concat({ number: monthNumber + year, name: monthName, purchases: [purchase], count: 1 })
        }

    }, [])

    return result;
}
