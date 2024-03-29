import { timeMonth } from "d3";
import { chain, groupBy, property, reduce } from "lodash";
import { compose, descend, prop, sort } from "ramda";

import { absDate, getMonthInWord } from "./dates";

import { inPercentaje, twoDecimals } from "./utils";

const month = compose( timeMonth, absDate, prop('date') );


const totalMonth = (acc, values, key) => {

    const month = new Date( key ).getMonth();
    
    const total = values.reduce((t, { amount }) => t += amount, 0);
    const descExpenses = sort( descend( prop( 'amount' )), values );

	(acc[month] || (acc[month] = {})).total = twoDecimals( total );
	(acc[month] || (acc[month] = {})).expenses = values;
	(acc[month] || (acc[month] = {})).month = getMonthInWord( key );
	(acc[month] || (acc[month] = {})).totalByCategory = getTotalBy({ prop: 'category.name', expenses: descExpenses, total });
	(acc[month] || (acc[month] = {})).totalByEstablishment = getTotalBy({ prop: 'establishment.name', expenses: descExpenses, total });

	return acc;
};


const getTotalBy = ({ expenses, total, prop }) => {
    const result = chain(expenses)
    .groupBy( property(prop) )
    .reduce( (acu, vals, k) => {
        
        const totalByCat = vals.reduce((t, { amount }) => t += amount, 0);

        (acu[k] || (acu[k] = {})).total = twoDecimals( totalByCat );
        (acu[k] || (acu[k] = {})).percentage = inPercentaje( totalByCat / total );
        (acu[k] || (acu[k] = {})).expenses = vals;
        (acu[k] || (acu[k] = {})).title = k;

        return acu;
    }, {} )
    .value();

    return result;
}

export const getTotalByMonth = data => chain(data)
    .groupBy( month )
    .reduce( totalMonth, {} )
    .value();