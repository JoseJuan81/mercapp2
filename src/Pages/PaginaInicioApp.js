import { map, upperFirst } from 'lodash';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { AreaChart } from '../components/d3/AreaChart';
import { ProgressBar } from '../components/d3/ProgressBar';

import { getLastMonths } from '../helper/getLastMonths';
import { getTotalByMonth } from '../helper/totalByMonth';

export const PaginaInicioApp = () => {

	// === STORE ===
	const { expenses, currencies } = useSelector( store => store.user );

	// === STATE ===
	const [currentMonth, setCurrentMonth] = useState( new Date().getMonth() );

	// === VARIABLES LOCALES ===
	const totalByMonth = getTotalByMonth( expenses );
	const last3ExpenseMonth = getLastMonths({ period: 3, data: totalByMonth });
	const [currency] = currencies;

	return (
		<div
			className=""
		>
			<MonthlyExpensesCard
				monthDate={ totalByMonth[currentMonth]?.month }
				amount={ totalByMonth[currentMonth]?.total }
				currency={ currency?.symbol }
				average={ 817.35 }
				diferencePercentageToPrevius={ 9.89 }
				last3ExpenseMonth={ last3ExpenseMonth }
			/>
			
			<CategorySummaryCard
				currentMonth={ totalByMonth[currentMonth] }
				currency={ currency?.symbol }
			/>

			<EstablishmentSummaryCard
				currentMonth={ totalByMonth[currentMonth] }
				currency={ currency?.symbol }
			/>
			
		</div>
	)
}

export const MonthlyExpensesCard = ({
	monthDate,
	amount,
	currency,
	average,
	diferencePercentageToPrevius,
	last3ExpenseMonth,
}) => {
	return (
		<div
			className="
				rounded-lg shadow-md
				mx-auto mt-4 mb-8 px-4 pt-4 pb-6	
				max-w-60
			"
			>
			<div
				className="
					flex flex-col items-center
				"
			>
				<MonthDate monthDate={ monthDate } />

				<MonthAmount
					currency={ currency }
					amount={ amount }
					diferencePercentageToPrevius={ diferencePercentageToPrevius }
				/>

				<AreaChart
					lastAmountsByMonth={ last3ExpenseMonth }
				/>

				{/* <ExpenseAverage
					currency={ currency }
					average={ average }
				/>*/}

			</div>
		</div>
	)
}

export const MonthDate = ({ monthDate }) => {
	return (
		<span className="text-lime-500 font-bold">{ monthDate }</span>
	)
}

export const MonthAmount = ({ currency, amount, diferencePercentageToPrevius }) => {
	return (
		<div
			className="
				flex items-center justify-center
				my-4
				w-full
				relative
			"
		>
			<div
				className="
						text-5xl font-bold text-warmGray-700
						flex items-end justify-center
						col-span-3
				"
			>
				<span
					className="
						text-sm text-warmGray-500
						mr-2
					"
				>{ currency }</span>
				<span>{ amount }</span>
			</div>

			{/* <CompareToPrevius diferencePercentageToPrevius={ diferencePercentageToPrevius } /> */}
			
		</div>
	)
}

export const ExpenseAverage = ({ currency, average }) => {
	return (
		<div
			className="
				text-warmGray-400 text-xs
			"
		>
			<span>promedio:</span>
			<span
				className="
					ml-2 mr-1
				"
			>{ currency }</span>
			<span>{ average }</span>
		</div>
	)
}

export const CompareToPrevius = ({ diferencePercentageToPrevius }) => {
	return (
		<div
			className="
				absolute top-0 left-0
				w-full h-full
				flex justify-end items-center
			"
		>
			<div className="w-auto h-10 flex items-center">
				<i className="fas fa-arrow-circle-up"></i>
			</div>
			<div>{ diferencePercentageToPrevius }</div>
			<span>%</span>
		</div>
	)
}

export const CategorySummaryCard = ({ currentMonth, currency }) => {
	return (
		<div
			className="
				mx-6 px-4 py-4 mb-8
				flex flex-col items-center
				rounded-lg
				shadow-md
			"
		>
			<h2
				className="
					text-lg font-bold text-sky-500
				"
			>Acumulado por categoría</h2>
			<ul
				className="
					divide-y-2 divide-warmGray-100
					mt-2
				"
			>
				{ map( currentMonth?.totalByCategory, (val, key) => (
					<li
						key={ key }
						className="
							grid grid-cols-6
							items-center
							h-10
							font-semibold text-sm
							pt-3 mb-3
						"
					>
						<span 
							className="
								col-span-2
								font-semibold text-sm text-warmGray-600
							"
						>{ upperFirst( key ) }</span>

						<ProgressBar
							className="col-span-3 px-2"
							percentage={ val.percentage }
						/>
						
						<span
							className="
								justify-self-end
								text-base text-warmGray-600
							"
						>
							<span className="text-xs mr-1">{ currency }</span>
							{ val.total }
						</span>
					</li>
				)) }

			</ul>
		</div>
	)
}

export const EstablishmentSummaryCard = ({ currentMonth, currency }) => {
	return (
		<div
			className="
				mx-6 px-4 py-4 mb-8
				flex flex-col items-center
				rounded-lg
				shadow-md
			"
		>
			<h2
				className="
					text-lg font-bold text-lime-500
				"
			>Acumulado por establecimiento</h2>
			<ul
				className="
					divide-y-2 divide-warmGray-100
					mt-2
				"
			>
				{ map( currentMonth?.totalByEstablishment, (val, key) => (
					<li
						key={ key }
						className="
							grid grid-cols-6
							items-center
							h-10
							font-semibold text-sm
							pt-3 mb-3
						"
					>
						<span 
							className="
								col-span-2
								font-semibold text-sm text-warmGray-600
							"
						>{ upperFirst( key ) }</span>

						<ProgressBar
							className="col-span-3 px-2"
							percentage={ val.percentage }
						/>
						
						<span
							className="
								justify-self-end
								text-base text-warmGray-600
							"
						>
							<span className="text-xs mr-1">{ currency }</span>
							{ val.total }
						</span>
					</li>
				)) }

			</ul>
		</div>
	)
}
