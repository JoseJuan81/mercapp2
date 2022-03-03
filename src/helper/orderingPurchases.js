import { format, getMonth, getYear, getWeek } from "date-fns";
import { es, enUS } from 'date-fns/locale';
import { round } from "functionallibrary";

import { type } from "../constant/type";

const locale = window.navigator.language.includes('es') ? es : enUS;

const TWODECIMALS = round( 2 );

export const orderingPurchases = ( list ) => {
    const purchases = list.reduce( ( acc, item ) => {

        const { closed } = item;
        const position = closed ? 1 : 0;
        
        acc[position].push( item )
        return acc;
        
    }, [[], []]);

    return [...purchases[0], ...purchases[1]];
}

export const getPurchasesByPeriod = (purchases, { period }) => {

    // ===== MES =====
    const isMonth = period === type.period.month;
    const monthInLetter = 'MMMM';
    
    // ===== SEMANA =====
    const isWeek = period === type.period.week;
    const weekInLetter = 'wo';

    // ===== FUNCINOES A USAR =====
    const getByPeriod = ( isMonth && getMonth ) || ( isWeek && getWeek );
    const periodInLetter = ( isMonth && monthInLetter ) || ( isWeek && weekInLetter );

    const result = purchases.reduce((period, purchase) => {

        const date = new Date( purchase.date );
        const periodNumber = getByPeriod( date )
        const year = getYear( date );
        const dateFormatted = format( date, periodInLetter, { locale });
        
        const periodName = ( isMonth && dateFormatted + ' - ' + year ) || ( isWeek && `Semana ${dateFormatted} - ${year}` );

        const existIndex = period.findIndex(m => m.name === periodName);

        if ( existIndex > -1) {

            const thisPeriod = period[existIndex];
            thisPeriod.purchases = [].concat( thisPeriod.purchases, purchase );
            thisPeriod.count += 1;
            thisPeriod.total = TWODECIMALS( thisPeriod.total + purchase.total );
            return period;
        } else {

            return period.concat({
                number: periodNumber + year,
                name: periodName,
                purchases: [purchase],
                count: 1,
                total: TWODECIMALS( purchase.total ),
                checkAll: false,
            })
        }

    }, [])

    return result;
}
