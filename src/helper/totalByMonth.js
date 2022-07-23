import { timeMonth } from "d3";
import { chain, groupBy, property, reduce } from "lodash";
import { compose, prop } from "ramda";

import { absDate, getMonthInWord } from "./dates";

const month = compose( timeMonth, absDate, prop('date') );
const totalMonth = (acc, values, key) => {

    const month = new Date( key ).getMonth();
	(acc[month] || (acc[month] = {})).expenses = values;
	(acc[month] || (acc[month] = {})).month = getMonthInWord( key );
	(acc[month] || (acc[month] = {})).total = values.reduce((t, { amount }) => t += amount, 0);
	(acc[month] || (acc[month] = {})).totalByCategory = getTotalByCategory( values )

	return acc;
};

const getTotalByCategory = data => chain(data)
    .groupBy( property('category.name') )
    .reduce( (acu, vals, k) => {
        (acu[k] || (acu[k] = {})).expenses = vals;
        (acu[k] || (acu[k] = {})).total = vals.reduce((t, { amount }) => t += amount, 0);

        return acu;
    }, {} )
    .value()


export const getTotalByMonth = data => chain(data)
    .groupBy( month )
    .reduce( totalMonth, {} )
    .value();