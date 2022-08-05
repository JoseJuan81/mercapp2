import { timeDay, timeMonth, timeWeek } from 'd3';
import { groupBy, map, orderBy, upperFirst } from 'lodash';
import { prop } from 'ramda';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'redux';

import { BaseButton } from '../../components/Buttons/AppButtons';

import { type } from '../../constant/type';

import { absDate, getFormatDate } from '../../helper/dates';

const TIME__OPTION = {
	[type.timePeriod.day]: timeDay,
	[type.timePeriod.week]: timeWeek,
	[type.timePeriod.month]: timeMonth
}

const TIME__FORMAT = {
	[type.timePeriod.day]: type.timeFormat.day,
	[type.timePeriod.week]: type.timeFormat.week,
	[type.timePeriod.month]: type.timeFormat.month
}

export const PaginaExpensesList = () => {

    // STORE
    const { currencies, expenses: expensesBase } = useSelector( store => store.user );

	// VARIABLES LOCALES
	const [currency] = currencies;

	// STATE
	const [periodTime, setPeriodTime] = useState( type.timePeriod.day);
	const [expenses, setExpenses] = useState({});

	useEffect(() => {

		const descExpenses = orderBy( expensesBase, ["date"], ["desc"] );
		// timeMonth, timeDay, timeWeek
		// la función de abajo tambien está en totalByMonth.js. Extraer a archivo en helper
		// la función de abajo retorna un objeto con las llaves desordenas. Las fechas no están
		// ordenadas cronológicamente
		const timeToUsed = TIME__OPTION[periodTime];
		const time = compose( timeToUsed, absDate, prop('date') );
		const expensesGroupedBy = groupBy( descExpenses, time );
		setExpenses( expensesGroupedBy );

	}, [periodTime])
	

	return (
	<div
		className="
			px-3
		"
	>
		<div
			className="
				flex justify-center items-center
				py-3 mb-3
				sticky top-0
				bg-white
			"
		>
			<BaseButton
				isButton
				className={`
					text-base font-bold ${ type.timePeriod.day === periodTime ? 'text-white' : 'text-warmGray-500' }
					${ type.timePeriod.day === periodTime ? 'bg-lime-500' : 'bg-white' }
					flex-auto
					border rounded ${ type.timePeriod.day === periodTime ? 'border-lime-500' : 'border-warmGray-300' }
					mx-1 py-1
				`}
				onClick={ () => setPeriodTime( type.timePeriod.day ) }
			>Día</BaseButton>
			<BaseButton
				isButton
				className={`
					text-base font-bold ${ type.timePeriod.week === periodTime ? 'text-white' : 'text-warmGray-500' }
					${ type.timePeriod.week === periodTime ? 'bg-lime-500' : 'bg-white' }
					flex-auto
					border rounded ${ type.timePeriod.week === periodTime ? 'border-lime-500' : 'border-warmGray-300' }
					mx-1 py-1
				`}
				onClick={ () => setPeriodTime( type.timePeriod.week ) }
			>Semana</BaseButton>
			<BaseButton
				isButton
				className={`
					text-base font-bold ${ type.timePeriod.month === periodTime ? 'text-white' : 'text-warmGray-500' }
					${ type.timePeriod.month === periodTime ? 'bg-lime-500' : 'bg-white' }
					flex-auto
					border rounded ${ type.timePeriod.month === periodTime ? 'border-lime-500' : 'border-warmGray-300' }
					mx-1 py-1
				`}
				onClick={ () => setPeriodTime( type.timePeriod.month ) }
			>Mes</BaseButton>
		</div>

		<ExpensesTable
			expenses={ expenses }
			currency={ currency?.symbol }
			periodTime={ periodTime }
		/>
	</div>
	)
}

const ExpensesTable = ({ currency, expenses, periodTime }) => {

    return (
        <ul
			className="
			
			"
		>
			{/**
			 * @val arreglo de valores correspondientes a la llave k
			 * @k key del objeto principal */}
            {map(expenses, (values, key) => (
                <li
                    key={ key }
					className="
						mb-4 px-2 py-4
						rounded
						shadow
					"
                >
					<h3
						className="
							font-bold text-lg
							mb-2
						"
					>{ upperFirst( getFormatDate( key, TIME__FORMAT[periodTime] ) )}</h3>

					<div
						className="
							grid grid-cols-3 items-center justify-center
							text-sm font-semibold
						"
					>
						<span>Fecha</span>
						<span>Monto</span>
						<div>Acciones</div>
					</div>

					{map(values, (v, k) => (
						<div
							key={ v.id }
							className="
								grid grid-cols-3 grid-rows-2
								items-center justify-center
								text-sm
								py-1
							"
						>
							<span
								className="
									text-xs
								"
							>{ getFormatDate( v.date ) }</span>
							<span>{ currency + v.amount }</span>
							<span
								className="
									truncate
									row-span-2
								"
							>{ upperFirst( v.category.name ) }</span>
							<span
								className="
									truncate
									row-span-2 col-span-2
								"
							>{ upperFirst( v.establishment.name ) }</span>
							<div
								className="
									col-span-3 row-span-2
								"
							>Acciones</div>
						</div>
					))}
                </li>
            ))}
        </ul>
    )
}
