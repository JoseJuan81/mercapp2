import { timeDay, timeMonth, timeWeek } from "d3";
import { compose, getPropertysValue, isEmpty } from "functionallibrary";
import { groupBy, orderBy, reduce } from "lodash";
import { CATEGORY, ESTABLISHMENT } from "../constant/defaults";

import { type } from "../constant/type";
import { absDate } from "./dates";
import { twoDecimals } from "./utils";

export const TIME__OPTION = {
	[type.timePeriod.day]: timeDay,
	[type.timePeriod.week]: timeWeek,
	[type.timePeriod.month]: timeMonth
}

export const TIME__FORMAT = {
	[type.timePeriod.day]: type.timeFormat.day,
	[type.timePeriod.week]: type.timeFormat.week,
	[type.timePeriod.month]: type.timeFormat.month
}

export const SELECTING__TIME = periodTime => compose( TIME__OPTION[periodTime], absDate, getPropertysValue('date') );

export const CALCULATE__TOTAL = arr => {

	if( isEmpty( arr )) return 0;

	const sumReduce = (acc, item) =>  acc + item.amount;
	return twoDecimals( reduce( arr, sumReduce, 0 ) );
}

export const EXPENSES__FILTERED = ({ filter, param, expenses }) => {

	if (isEmpty(expenses)) {
		return
	}

	const filterValue = {
		[CATEGORY]: "category.name",
		[ESTABLISHMENT]: "establishment.name"
	}

	const groupByParamObject = groupBy( expenses, filterValue[filter] );
	return getPropertysValue(param, groupByParamObject);
}

export const ORDER_DESC_EXPENSES = expenses => orderBy( expenses, ["date"], ["desc"] );

export const TIME_SELECTING = time => SELECTING__TIME( time );