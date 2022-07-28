import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { equals, or, values } from 'ramda';
import { every, isEmpty } from 'functionallibrary';

import { updateNewExpense } from '../../actions/newExpenseAction';

import { DataList } from '../../components/Form/DataList';
import { InputField } from '../../components/Form/InputField';

import { type } from '../../constant/type';

import { getFromLocalStorage, removeFromLocalStorage, setInLocalStorage } from '../../helper/localStorage';
import { timeFormat } from 'd3';
import { CATEGORY, ESTABLISHMENT } from '../../constant/defaults';

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

	// STATE
	const [formErrors, setFormErrors] = useState( formField );

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
			const parsedTime = timeFormat("%Y-%m-%d");
			dispatch( updateNewExpense( { ...newExpense, date: parsedTime( Date.now() ) } ) );
		}

	}, [])

	// ACTUALIZAR EL LOCAL STORAGE
	useEffect(() => {

		setInLocalStorage( type.localStorage.newExpense, { ...newExpense });

		return () => {
			const { date, ...rest } = newExpense;
			const newExpenseValues = values( rest );
			if ( every( isEmpty, newExpenseValues) ) {
				removeFromLocalStorage( type.localStorage.newExpense );
			}
		}
	}, [newExpense])

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
			</form>
		</div>
	)
}

