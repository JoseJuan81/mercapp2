import { timeMonth } from "d3";
import { chain, groupBy, property, reduce } from "lodash";
import { compose, prop } from "ramda";

import { absDate, getMonthInWord } from "./dates";

import { inPercentaje } from "./utils";

const month = compose( timeMonth, absDate, prop('date') );


const totalMonth = (acc, values, key) => {

    const month = new Date( key ).getMonth();
    
    const total = values.reduce((t, { amount }) => t += amount, 0);

	(acc[month] || (acc[month] = {})).total = total;
	(acc[month] || (acc[month] = {})).expenses = values;
	(acc[month] || (acc[month] = {})).month = getMonthInWord( key );
	(acc[month] || (acc[month] = {})).totalByCategory = getTotalByCategory({ expenses: values, total });

	return acc;
};


const getTotalByCategory = ({ expenses, total }) => {
    const result = chain(expenses)
    .groupBy( property('category.name') )
    .reduce( (acu, vals, k) => {
        
        const totalByCat = vals.reduce((t, { amount }) => t += amount, 0);

        (acu[k] || (acu[k] = {})).total = totalByCat;
        (acu[k] || (acu[k] = {})).percentage = inPercentaje( totalByCat / total );
        (acu[k] || (acu[k] = {})).expenses = vals;

        return acu;
    }, {} )
    .value();

    return result;
}


export const getTotalByMonth = data => chain(data)
    .groupBy( month )
    .reduce( totalMonth, {} )
    .value();