import { timeMonth } from "d3";

export const getLastMonths = ({ period, data, currentMonth }) => {
	
	const currentTime = new Date().setMonth( currentMonth );
	const finalArr = [];

	for (let i = 0; i < period; i += 1) {
		const firstMonthsDay = timeMonth.floor(currentTime);
		const dateMonth = timeMonth.offset(firstMonthsDay, -i);
		const month = dateMonth.getMonth();
		const amount = data[month]?.total || 0;
		finalArr.push({ date: dateMonth, amount })
	}

	return finalArr;
}