import { timeDay, timeMonth, timeWeek } from 'd3';
import { isEmpty, isNotEmpty } from 'functionallibrary';
import { groupBy, map, orderBy, reduce, sum, upperFirst } from 'lodash';
import { prop } from 'ramda';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import { startDeletingExpense } from '../../actions/expensesAction';

import { BaseButton, CheckButton, CloseButton, EditButton, TrashButton } from '../../components/Buttons/AppButtons';
import { BottomModal } from '../../components/Modal/BottomModal';

import { type } from '../../constant/type';

import { absDate, getFormatDate } from '../../helper/dates';
import { twoDecimals } from '../../helper/utils';

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

const SELECTING__TIME = ( periodTime ) => compose( TIME__OPTION[periodTime], absDate, prop('date') );
const CALCULATE__TOTAL = arr => {

	if( isEmpty( arr )) return 0;

	const sumReduce = (acc, item) =>  acc + item.amount;
	return twoDecimals( reduce( arr, sumReduce, 0 ) );
}

export const PaginaExpensesList = () => {

    // STORE
    const { currencies, expenses: expensesBase } = useSelector( store => store.user );

	// VARIABLES LOCALES
	const [currency] = currencies;

	// STATE
	const [periodTime, setPeriodTime] = useState( type.timePeriod.day);
	const [expenses, setExpenses] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [currentExpense, setCurrentExpense] = useState({});

	// FUNCIONES LOCALES
	const handlerDeletingExpense = ( expense ) => {

		setShowModal( true );
		setCurrentExpense( expense );
	}

	const handlerCloseDeleteModal = () => {

		setShowModal( false );
		setCurrentExpense({});
	}

	useEffect(() => {

		const descExpenses = orderBy( expensesBase, ["date"], ["desc"] );

		const timeSelected = SELECTING__TIME( periodTime );
		const expensesGroupedByTime = groupBy( descExpenses, timeSelected );
		setExpenses( expensesGroupedByTime );

	}, [periodTime, expensesBase])
	

	return (
	<div
		className="
			px-3
		"
	>
		
		<TimePeriodButtons setPeriodTime={ setPeriodTime } periodTime={ periodTime } />

		<ExpensesTable
			expenses={ expenses }
			currency={ currency?.symbol }
			periodTime={ periodTime }
			deleteAction={ handlerDeletingExpense }
		/>

		<BottomModal show={ showModal }>
			<DeleteExpenseForSure
				currency={ currency }
				expense={ currentExpense }
				handlerCloseDeleteModal={ handlerCloseDeleteModal }
			/>
		</BottomModal>

	</div>
	)
}

const TimePeriodButtons = ({ setPeriodTime, periodTime }) => {
	return (
		<div
			className="
				flex justify-center items-center
				py-3 mb-3
				sticky top-0 z-20
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
	)
}

const ExpensesTable = ({ currency, expenses, periodTime, deleteAction }) => {

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
                    key={ key + Date.now() }
					className="
						mb-4 px-2 py-4
						rounded
						shadow
					"
                >
					<HeaderBlock
						date={ key }
						periodTime={ periodTime }
						currency={ currency }
						expenses={ values }
					/>

					<HeaderTable />
					<BodyTable
						expensesArray={ values }
						currency={ currency }
						deleteAction={ deleteAction }
					/>
					
                </li>
            ))}
        </ul>
    )
}

const HeaderBlock = ({ date, periodTime, currency, expenses }) => {
	return (
		<div
			className="
				flex items-center justify-between
				font-bold text-lg
				mb-2
				sticky top-14
				h-16
				bg-white
			"
		>
			<h3
				className=""
			>{ upperFirst( getFormatDate( date, TIME__FORMAT[periodTime] ) )}</h3>

			<h3>
				<span className="text-xs font-normal mr-1">{ currency }</span>
				{ CALCULATE__TOTAL( expenses ) }
			</h3>

		</div>
	)
}

const HeaderTable = React.memo(() => {
	return (
		<div
			className="
				grid grid-cols-8 items-center justify-center
				text-sm font-semibold text-center
				sticky top-28
				bg-white
				py-3
			"
		>
			<span>N°</span>
			<span
				className="
					col-span-2
				"
			>Fecha</span>
			<span
				className="
					col-span-3
				"
			>Monto</span>
			<div
				className="
					col-span-2
				"
			>Acciones</div>
		</div>
	)
})

const BodyTable = ({ expensesArray, currency, deleteAction }) => {
	return (
		<>
			{!isEmpty(map) && map(expensesArray, (v, ind) => (
				<div
					key={ v._id }
					className={`
						grid grid-cols-8 grid-rows-2 gap-y-2
						items-center justify-center
						text-sm text-center
						py-2
						${ ind !== 0 ? 'border-t' : 'border-none' }
					`}
				>

					<span className="text-xs row-span-2">{ ind + 1 }</span>

					<span className="text-xs col-span-2">{ getFormatDate( v.date ) }</span>

					<span className="col-span-3">{ currency + v.amount }</span>

					<ItemActions
						deleteAction={ () => deleteAction( v ) }
					/>

					<span className="truncate col-span-2">{ upperFirst( v.category.name ) }</span>

					<span className="truncate col-span-3">{ upperFirst( v.establishment.name ) }</span>

					<span className="col-span-8 italic">{ v.description }</span>

				</div>
			))}
		</>
	)
}

const ItemActions = ({ deleteAction }) => {
	return (
		<div className="col-span-2 row-span-2">
			<EditButton
				isButton
				className="flex-auto p-2 mx-1 text-base"
			/>
			<TrashButton
				isButton
				className="flex-auto p-2 mx-1 text-base text-rose-600"
				onClick={ deleteAction }
			/>
		</div>
	)
}

const DeleteExpenseForSure = ({ expense, currency, handlerCloseDeleteModal }) => {

	// STORE
	const dispatch = useDispatch();

	return (
		<div>
			<i className="fas fa-exclamation-triangle text-rose-600 text-5xl flex items-center justify-center my-4"></i>

			<h2 className="font-bold text-center">¿Esta seguro que quiere eliminar este gasto?</h2>

			{ !isEmpty(expense) &&
				<ul className="divide-y-2 my-4">
					<li className="grid grid-cols-2">
						<span className="text-center font-semibold text-warmGray-600">Monto:</span>
						<span className="text-center font-bold text-lg">{ currency?.symbol + expense?.amount }</span>
					</li>
					<li className="grid grid-cols-2">
						<span className="text-center font-semibold text-warmGray-600">Fecha:</span>
						<span className="text-center font-bold text-lg">{ upperFirst( getFormatDate( expense?.date )) }</span>
					</li>
					<li className="grid grid-cols-2">
						<span className="text-center font-semibold text-warmGray-600">Lugar:</span>
						<span className="text-center font-bold text-lg">{ expense?.establishment?.name }</span>
					</li>
					<li className="grid grid-cols-2">
						<span className="text-center font-semibold text-warmGray-600">Categoría:</span>
						<span className="text-center font-bold text-lg">{ expense?.category?.name }</span>
					</li>
					{expense?.description &&
						<li className="grid grid-cols-2">
							<span className="text-center font-semibold text-warmGray-600">Descripción:</span>
							<span className="text-center font-bold text-lg">{ expense?.description }</span>
						</li>
					}
				</ul>
			}

			<div className="flex items-center justify-between py-4">
				<CloseButton
					isButton
					className="flex-auto text-white mx-1 bg-rose-600 rounded-md"
					onClick={ handlerCloseDeleteModal }
				/>
				<CheckButton
					isButton
					className="flex-auto text-white mx-1 bg-lime-600 rounded-md"
					onClick={ () => dispatch( startDeletingExpense( expense._id ) ) }
				/>
			</div>
		</div>
	)
}
