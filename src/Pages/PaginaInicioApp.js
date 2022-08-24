import { map, upperFirst } from 'lodash';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { BackButton, DownButton } from '../components/Buttons/AppButtons';
import { AreaChart } from '../components/d3/AreaChart';
import { ProgressBar } from '../components/d3/ProgressBar';

import { expensesUrls } from '../constant/routes';

import { transformToArrayAndSortDescendingByProp } from '../helper/arrayUtils';
import { getMonthInWord } from '../helper/dates';
import { getLastMonths } from '../helper/getLastMonths';
import { getTotalByMonth } from '../helper/totalByMonth';

export const PaginaInicioApp = () => {

	// === STORE ===
	const { expenses, currencies } = useSelector( store => store.user );

	// === STATE ===
	const [currentMonth, setCurrentMonth] = useState( new Date().getMonth() );

	// === VARIABLES LOCALES ===
	const monthInWords = getMonthInWord( new Date().setMonth( currentMonth ) );
	const totalByMonth = getTotalByMonth( expenses );
	const last3ExpenseMonth = getLastMonths({ period: 3, data: totalByMonth, currentMonth });

	const [currency] = currencies;

	return (
		<div
			className=""
		>
			<div
				className="
					flex justify-center
				"
			>
				<BackButton
					isButton
					className="w-10"
					onClick={ () => setCurrentMonth( m => m - 1 ) }
				/>

				<MonthlyExpensesCard
					monthDate={ monthInWords }
					amount={ totalByMonth[currentMonth]?.total || 0 }
					currency={ currency?.symbol }
					diferencePercentageToPrevius={ 9.89 }
					last3ExpenseMonth={ last3ExpenseMonth }
				/>

				<BackButton
					isButton
					className="w-10 transform rotate-180"
					onClick={ () => setCurrentMonth( m => m + 1 ) }
				/>
			</div>
			
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

const MonthlyExpensesCard = ({
	monthDate,
	amount,
	currency,
	diferencePercentageToPrevius,
	last3ExpenseMonth,
}) => {
	return (
		<div
			className="
				rounded-lg shadow-md
				mt-4 mb-8 px-4 pt-4 pb-6	
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

			</div>
		</div>
	)
}

const MonthDate = ({ monthDate }) => {
	return (
		<span className="text-lime-500 font-bold">{ monthDate }</span>
	)
}

const MonthAmount = ({ currency, amount, diferencePercentageToPrevius }) => {
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

const CompareToPrevius = ({ diferencePercentageToPrevius }) => {
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

const CategorySummaryCard = ({ currentMonth, currency }) => {

	// STATE
	const [collapse, setCollapse] = useState(false);

	// VARIABLES LOCALES
	const totalByCategory = transformToArrayAndSortDescendingByProp({
		obj: currentMonth?.totalByCategory,
		prop: 'total'
	});

	const heightCard = { low: 315, high: 10000 }

	useEffect(() => {
	
		const summaryCard = document.querySelector("div[data-ref='category-summary-card']");
		heightCard.high = summaryCard.clientHeight;
		setCollapse( true );

	}, [])

	return (
		<div
			data-ref="category-summary-card"
			style={{
				maxHeight: collapse ? heightCard.low : heightCard.high
			}}
			className="
				mx-6 px-4 pt-4 pb-16 mb-8
				flex flex-col items-center
				rounded-lg
				shadow-md
				border border-warGray-200
				overflow-hidden
				relative
				transition-max-h duration-300
			"
		>
			<h2 className="text-lg font-bold text-sky-500">
				Acumulado por categoría
			</h2>

			<ProgressBarComponent data={ totalByCategory } currency={ currency } />

			<div
				className="
					absolute bottom-0 left-0
					flex items-center justify-center
					w-full
					pb-4
					text-base text-sky-500
					bg-white
				"
				onClick={ () => setCollapse( c => !c ) }
			>
				<DownButton
					isButton
					className={`
						text-sky-500 text-base
						mx-2
						transform ${collapse ? 'rotate-0' : 'rotate-180'}
					`}
				/>
				<h4>{ collapse ? 'Mostrar mas' : 'Mostrar menos' }</h4>
			</div>
		</div>
	)
}

const EstablishmentSummaryCard = ({ currentMonth, currency }) => {
	
	// STATE
	const [collapse, setCollapse] = useState(false);

	// VARIABLES LOCALES
	const totalByEstablishment = transformToArrayAndSortDescendingByProp({
		obj: currentMonth?.totalByEstablishment,
		prop: 'total'
	});

	const heightCard = { low: 315, high: 10000 }

	useEffect(() => {
	
		const summaryCard = document.querySelector("div[data-ref='establishment-summary-card']");
		heightCard.high = summaryCard.clientHeight;
		setCollapse( true );

	}, [])

	return (
		<div
			data-ref="establishment-summary-card"
			style={{
				maxHeight: collapse ? heightCard.low : heightCard.high
			}}
			className="
				mx-6 px-4 pt-4 pb-16 mb-8
				flex flex-col items-center
				rounded-lg
				shadow-md
				border border-warGray-200
				overflow-hidden
				relative
				transition-max-h duration-300
			"
		>
			<h2
				className="
					text-lg font-bold text-lime-500
				"
			>Acumulado por establecimiento</h2>

			<ProgressBarComponent data={ totalByEstablishment } currency={ currency } />

			<div
				className={`
					absolute bottom-0 left-0
					flex items-center justify-center
					w-full
					pb-4
					text-base text-lime-500
					bg-white
				`}
				onClick={ () => setCollapse( c => !c ) }
			>
				<DownButton
					isButton
					className={`
						text-lime-500 text-base
						mx-2
						transform ${collapse ? 'rotate-0' : 'rotate-180'}
					`}
				/>
				<h4>{ collapse ? 'Mostrar mas' : 'Mostrar menos' }</h4>
			</div>
		</div>
	)
}

const ProgressBarComponent = React.memo(({ data, currency }) => {
	return (
		<ul className="divide-y-2 divide-warmGray-100 mt-2">
			{ map( data, val => (
				<li
					key={ `${val.title} - ${Math.random()}` }
					className="
						h-10
						font-semibold text-sm
						pt-3 mb-3
					"
				>
					<Link
						className="grid grid-cols-9 gap-2 items-center"
						to={{
							pathname: expensesUrls.list(),
							search: `?category=${ val.title }`
						}}
					>
						<span 
							className="
								col-span-3
								font-semibold text-sm text-warmGray-600
							"
						>{ upperFirst( val.title ) }</span>

						<ProgressBar
							className="
								col-span-4
								pl-2 pr-3 -ml-2
							"
							percentage={ val.percentage }
						/>
						
						<span
							className="
								col-span-2
								justify-self-end
								text-base text-warmGray-600
							"
						>
							<span className="text-xs mr-1">{ currency }</span>
							{ val.total }
						</span>
					</Link>
				</li>
			)) }

		</ul>
	)
})