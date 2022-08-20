import { isEmpty } from 'functionallibrary';
import { groupBy, map, orderBy, upperFirst } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startDeletingExpense, startEditingExpense } from '../../actions/expensesAction';

import { BaseButton, CheckButton, CloseButton, EditButton, TrashButton } from '../../components/Buttons/AppButtons';
import { BottomModal } from '../../components/Modal/BottomModal';

import { CATEGORY, ESTABLISHMENT } from '../../constant/defaults';
import { type } from '../../constant/type';

import { getFormatDate } from '../../helper/dates';
import {
	CALCULATE__TOTAL,
	EXPENSES__FILTERED,
	ORDER_DESC_EXPENSES,
	TIME_SELECTING,
	TIME__FORMAT
} from '../../helper/expensesList';

export const PaginaExpensesList = () => {

	// NAVEGACIÓN
	const params = new URLSearchParams( window.location.search );

    // STORE
	const dispatch = useDispatch();
    const { currencies, expenses: expensesBase } = useSelector( store => store.user );

	// VARIABLES LOCALES
	const [currency] = currencies;
	const categoryParam = params.get( CATEGORY );
	const establishmentParam = params.get( ESTABLISHMENT );

	// STATE
	const [periodTime, setPeriodTime] = useState("");
	const [expenses, setExpenses] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [currentExpense, setCurrentExpense] = useState({});
	const [currentExpenseIndex, setCurrentExpenseIndex] = useState(-1);

	// FUNCIONES LOCALES
	const handlerOpeningDeleteExpenseModal = ( expense ) => {

		setShowModal( true );
		setIsDeleting( true );
		setCurrentExpense( expense );
	}

	const handlerOpeningEditExpenseModal = ({ expense, index }) => {

		setShowModal( true );
		setIsEditing( true );
		setCurrentExpense( expense );
		setCurrentExpenseIndex( index );
	}

	const handlerCloseDeleteModal = () => {

		setShowModal( false );
		setIsDeleting( false );
		setCurrentExpense({});
	}

	const handlerCloseEditModal = () => {

		setShowModal( false );
		setIsEditing( false );
		setCurrentExpense({});
	}

	const handleDeleteExpense = ( expenseId ) => {
		dispatch( startDeletingExpense( expenseId ) );
		handlerCloseDeleteModal();
	}

	const handleEditExpense = ( expense ) => {
		dispatch( startEditingExpense({ expense, index: currentExpenseIndex }) );
		handlerCloseEditModal();
	}

	// AGRUPAR GASTOS POR PERIODO DE TIEMPO (DÍA, SEMANA Y MES)
	// Y FILTRARLOS POR QUERY STRING SI EXISTE
	useEffect(() => {

		let localExpenses = [...expensesBase];
		let localPeriodoTime = periodTime || type.timePeriod.day;

		if (categoryParam) {
			const  filterOptions = {
				param: categoryParam,
				filter: CATEGORY,
				expenses: localExpenses
			};
			localExpenses = EXPENSES__FILTERED( filterOptions );
			localPeriodoTime = periodTime || type.timePeriod.month;
			
		}
		
		if (establishmentParam) {
			const  filterOptions = {
				param: establishmentParam,
				filter: ESTABLISHMENT,
				expenses: localExpenses
			};
			localExpenses = EXPENSES__FILTERED( filterOptions );
			localPeriodoTime = periodTime || type.timePeriod.month;
		}

		const expensesGroupedByTime = groupBy(
			ORDER_DESC_EXPENSES( localExpenses ),
			TIME_SELECTING( localPeriodoTime )
		);

		setExpenses( expensesGroupedByTime );
		setPeriodTime( localPeriodoTime );

	}, [periodTime, expensesBase, expensesBase.length]);
	

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
			deleteAction={ handlerOpeningDeleteExpenseModal }
			editAction={ handlerOpeningEditExpenseModal }
		/>

		<BottomModal show={ showModal }>
			{isDeleting &&
				<DeleteExpenseConfirm
					currency={ currency }
					expense={ currentExpense }
					handlerCloseDeleteModal={ handlerCloseDeleteModal }
					handleDeleteExpense={ handleDeleteExpense }
				/>
			}
			{isEditing &&
				<EditingExpenseForm
					currency={ currency }
					expense={ currentExpense }
					handlerCloseEditModal={ handlerCloseEditModal }
					handleEditExpense={ handleEditExpense }
				/>
			}
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

const ExpensesTable = ({ currency, expenses, periodTime, deleteAction, editAction }) => {

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
						mb-4 px-2 pb-4 pt-1
						rounded-lg
						shadow-md
						border border-warGray-200
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
						editAction={ editAction }
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
				sticky top-14
				h-12
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
				text-sm font-semibold text-center text-sky-500
				sticky top-24
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

const BodyTable = ({ expensesArray, currency, deleteAction, editAction }) => {

	// VARIABLES LOCALES
	const expenses = orderBy( expensesArray, ["date"], ["desc"] );

	return (
		<>
			{!isEmpty(map) && map(expenses, (v, ind) => (
				<div
					key={ v._id }
					className={`
						grid grid-cols-8 grid-rows-2 gap-y-2
						items-center justify-center
						text-sm text-center text-warmGray-500
						py-2
						${ ind !== 0 ? 'border-t' : 'border-none' }
					`}
				>

					<span className="text-base font-semibold row-span-3">{ ind + 1 }</span>

					<span className="col-span-2">{ getFormatDate( v.date ) }</span>

					<span className="font-semibold col-span-3">
						<span className="text-xxs font-normal mr-1">{ currency }</span>
							{ v.amount }
					</span>

					<ItemActions
						deleteAction={ () => deleteAction( v ) }
						editAction={ () => editAction({ expense: v, index: ind }) }
					/>

					<span className="ml-4 text-left font-semibold truncate col-span-5">
						<span className="text-xs font-normal italic mr-1">
							<i className="fas fa-sliders-h"></i>
						</span>
						{ upperFirst( v.category.name ) }
					</span>

					<span className="ml-4 text-left font-semibold truncate col-span-7">
						<span className="text-xs font-normal italic mr-1">
							<i className="fas fa-store"></i>
						</span>
						{ upperFirst( v.establishment.name ) }
					</span>

					<span className="col-span-8 italic text-left text-xxs">{ v.description }</span>

				</div>
			))}
		</>
	)
}

const ItemActions = ({ deleteAction, editAction }) => {
	return (
		<div className="col-span-2 row-span-2">
			<EditButton
				isButton
				className="flex-auto p-2 mx-1 text-base"
				onClick={ editAction }
			/>
			<TrashButton
				isButton
				className="flex-auto p-2 mx-1 text-base text-rose-600"
				onClick={ deleteAction }
			/>
		</div>
	)
}

const DeleteExpenseConfirm = ({ expense, currency, handlerCloseDeleteModal, handleDeleteExpense }) => {

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
					onClick={ () => handleDeleteExpense( expense._id ) }
				/>
			</div>
		</div>
	)
}

const EditingExpenseForm = ({ expense, currency, handlerCloseEditModal, handleEditExpense }) => {

	// STATE
	const [expenseForm, setExpenseForm] = useState({ ...expense });

	return (
		<div>
			<i className="fas fa-exclamation-triangle text-yellow-500 text-5xl flex items-center justify-center my-4"></i>

			<h2 className="font-bold text-center">¿Esta seguro que quiere editar este gasto?</h2>

			

			<div className="flex items-center justify-between py-4">
				<CloseButton
					isButton
					className="flex-auto text-white mx-1 bg-rose-600 rounded-md"
					onClick={ handlerCloseEditModal }
				/>
				<CheckButton
					isButton
					className="flex-auto text-white mx-1 bg-lime-600 rounded-md"
					onClick={ () => handleEditExpense( expenseForm ) }
				/>
			</div>
		</div>
	)
}
