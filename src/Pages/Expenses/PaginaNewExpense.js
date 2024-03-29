import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose, equals, or, prop, reverse, sortBy, toLower} from 'ramda';
import { isEmpty, removeItemFromArrayByIndex } from 'functionallibrary';
import { map, now } from 'lodash';

import { updateNewExpense } from '../../actions/newExpenseAction';

import { DataList } from '../../components/Form/DataList';
import { InputField } from '../../components/Form/InputField';
import { AddCircleButton, TrashButton } from '../../components/Buttons/AppButtons';

import { type } from '../../constant/type';
import { CATEGORY, ESTABLISHMENT } from '../../constant/defaults';

import { getFromLocalStorage, setInLocalStorage } from '../../helper/localStorage';

import { PaginaLoadingNewExpense } from '../loading/PaginaLoadingNewExpense';

const isCategory = equals( CATEGORY );
const isEstablishment = equals( ESTABLISHMENT );

const formField = {
	date: '',
	amount: '',
	category: '',
	establishment: '',
	noErrors: true
};

export const PaginaNewExpense = () => {

	// STORE
	const newExpense = useSelector( store => store.newExpense );
	const { categories, establishments, items } = useSelector( store => store.user );
	const { loading } = useSelector( store => store.loading );

	// STATE
	const [formErrors, setFormErrors] = useState( formField );
	const [itemSelected, setItemSelected] = useState( '' );

	const dispatch = useDispatch();

	// FUNCIONES LOCALES
	const onChangeUpdateNewExpense = ( e ) => {
		
		const { name, value } = e.target;
		let expenseUpdated = { ...newExpense, [name]: Number( value ) || value };

		if ( or( isCategory( name ), isEstablishment( name ) ) ) {
			expenseUpdated = { ...newExpense, [name]: { name: value } }
		}

		dispatch( updateNewExpense( expenseUpdated ) );
	}

	const onChangeAddingItems = e => {
		const { value } = e?.target;
		setItemSelected( value );
	}

	const onClickAddItem = e => {
		e.preventDefault();

		if ( itemSelected ) {

			const newItem = {
				name: itemSelected,
				createdAt: Date.now()
			}
	
			const itemsSelected = [{ ...newItem }, ...newExpense.items ];
			dispatch( updateNewExpense({ ...newExpense, items: itemsSelected }) );
			setItemSelected('');
	
		}
		const itemField = window.document.querySelector("input[data-item='item-field']")
		itemField.select();
	}

	const onClickRemoveItem = index => {
		
		const newItems = removeItemFromArrayByIndex( index, newExpense.items );
		dispatch( updateNewExpense({ ...newExpense, items: [...newItems] }) );
	}

	const checkingForm = () => {

		let errors = { ...formField, noErrors: true };
		if ( isEmpty( newExpense.date ) ) {
			errors = { ...errors, noErrors: false, date: 'La fecha es requerida' };
		}

		if ( isEmpty( newExpense.amount ) ) {
			errors = { ...errors, noErrors: false, amount: 'El monto es requerido' };
		}

		if ( isEmpty( newExpense.category.name )) {
			errors = { ...errors, noErrors: false, category: 'La categoría es requerida'};
		}

		if ( isEmpty( newExpense.establishment.name )) {
			errors = { ...errors, noErrors: false, establishment: 'El establecimiento es requerido'};
		}
		setFormErrors({ ...errors });
	}

	// ESTABLECER INFORMACIÓN DEL LOCAL STORAGE
	useEffect(() => {

		const localInfo = getFromLocalStorage( type.localStorage.newExpense );
		
		if ( localInfo && localInfo.date ) {
			dispatch( updateNewExpense( { ...localInfo } ) );
		} else {
			
			dispatch( updateNewExpense( { ...newExpense } ) );
		}

	}, [])

	// ACTUALIZAR EL LOCAL STORAGE
	useEffect(() => {

		setInLocalStorage( type.localStorage.newExpense, { ...newExpense });
	}, [newExpense])

	if (loading) {
		return <PaginaLoadingNewExpense />
	}

	return (
		<div>
			<form
				className="
					grid grid-flow-row gap-4
					px-4 pt-4
				"
			>
				<fieldset>
					<InputField
                        type="date"
						name="date"
                        placeholder="dd/mm/aaaa"
						value={ newExpense.date }
						onChange={ onChangeUpdateNewExpense }
						onBlur={ checkingForm }
						error={ formErrors.date }
                    />
				</fieldset>

				<fieldset>
					<InputField
                        type="number"
						name="amount"
                        placeholder="monto gastado"
						value={ newExpense.amount }
						onChange={ onChangeUpdateNewExpense }
						onBlur={ checkingForm }
						error={ formErrors.amount }
                    />
				</fieldset>

				<fieldset>
					<DataList
						name="category"
						propToShow="name"
                        placeholder="categoría"
						options={ categories }
						value={ newExpense.category.name }
						onChange={ onChangeUpdateNewExpense }
						onBlur={ checkingForm }
						error={ formErrors.category }
                    />
				</fieldset>

				<fieldset>
					<DataList
						name="establishment"
						propToShow="name"
						placeholder="establecimiento"
						options={ establishments }
						value={ newExpense.establishment.name }
						onChange={ onChangeUpdateNewExpense }
						onBlur={ checkingForm }
						error={ formErrors.establishment }
					/>
				</fieldset>

				<fieldset>
					<InputField
                        type="text"
						name="description"
                        placeholder="descripción"
						value={ newExpense.description }
						onChange={ onChangeUpdateNewExpense }
                    />
				</fieldset>

				<fieldset
					className="
						flex items-center justify-start
					"
				>
					<DataList
						name="items"
						data-item="item-field" 
						propToShow="name"
                        placeholder="artículos"
						options={ items }
						value={ itemSelected }
						onChange={ onChangeAddingItems }
                    />
					<AddCircleButton
						isButton
						className="
							text-sky-400
							px-3
						"
						onClick={ onClickAddItem }
					/>
				</fieldset>
			</form>

			{ !isEmpty( newExpense.items ) && 
				<NewExpensesItems
					items={ newExpense.items }
					onClickRemoveItem={ onClickRemoveItem }
				/>
			}

		</div>
	)
}

const NewExpensesItems = ({ items, onClickRemoveItem }) => {
	// botones para ordenar alfabéticamente y por tiempo
	// STATE
	const [sorted, setSorted] = useState([]);
	const [order, setOrder] = useState("new");

	useEffect(() => {

		if (order === "asc") {
			const ascendingAlphabetical = sortBy(compose(toLower, prop("name")) );
			setSorted(ascendingAlphabetical(items))
		} else if (order === "desc") {
			const ascendingAlphabetical = sortBy(compose(toLower, prop("name")));
			setSorted( reverse( ascendingAlphabetical( items ) ) );
		} else if (order === "old") {
			const ascendingTime = sortBy(prop("createdAt"));
			setSorted(ascendingTime(items))
		} else {
			const ascendingTime = sortBy(prop("createdAt"));
			setSorted( reverse( ascendingTime( items ) ) );

		}
		
	}, [order, items])

	return (
		<div
			className="
				p-3
			"
		>
			<div
				className="
					flex items-center justify-center
					space-x-4
				"
			>
				<button
					className={`
						border rounded
						px-2 py-1
						${ order === "asc" ? "bg-lime-500" : "bg-white" }
						${ order === "asc" ? "border-lime-500" : "border-warmGray-300" }
						${ order === "asc" ? "text-white" : "text-warmGray-600" }
					`}
					onClick={ () => setOrder("asc") }
				>A-Z</button>
				<button
					className={`
						border rounded
						px-2 py-1
						${ order === "desc" ? "bg-lime-500" : "bg-white" }
						${ order === "desc" ? "border-lime-500" : "border-warmGray-300" }
						${ order === "desc" ? "text-white" : "text-warmGray-600" }
					`}
					onClick={ () => setOrder("desc") }
				>Z-A</button>
				<button
					className={`
						border rounded
						px-2 py-1
						${ order === "new" ? "bg-lime-500" : "bg-white" }
						${ order === "new" ? "border-lime-500" : "border-warmGray-300" }
						${ order === "new" ? "text-white" : "text-warmGray-600" }
					`}
					onClick={ () => setOrder("new") }
				>Joven</button>
				<button
					className={`
						border rounded
						px-2 py-1
						${ order === "old" ? "bg-lime-500" : "bg-white" }
						${ order === "old" ? "border-lime-500" : "border-warmGray-300" }
						${ order === "old" ? "text-white" : "text-warmGray-600" }
					`}
					onClick={ () => setOrder("old") }
				>Viejo</button>
			</div>
			<ul
				className="
					flex items-start justify-center flex-col
					divide-y
				"
			>
				{map(sorted, (item, i) => (
					<li
						key={ `${Math.random()} - ${i} - ${item}`}
						className="
							flex items-center justify-between
							px-3 py-2
							w-full
							text-warmGray-500 text-sm
						"
					>
						<span
							className="
								flex-initial
								text-sm
							"
						>{ i + 1 }</span>
						<h2
							className="
								flex-1
								mx-3
								font-semibold italic
							"
						>{ item.name }</h2>
						<TrashButton
							isButton
							className="
								text-rose-500 text-sm
								flex-initial
								p-2
							"
							onClick={ () => onClickRemoveItem( i ) }
						/>
					</li>
				))}
			</ul>
		</div>
	)
}