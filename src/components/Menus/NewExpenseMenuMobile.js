import { isEmpty } from 'functionallibrary';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startCreatingNewExpense } from '../../actions/newExpenseAction';

import { BackButton, CheckButton } from '../Buttons/AppButtons';

import { inicioPath } from '../../constant/routes';

export const NewExpenseMenuMobile = () => {

	// STORE
	const dispatch = useDispatch();
	const newExpense = useSelector( store => store.newExpense );

	// STATE
	const [disabled, setDisabled] = useState(true)

	// FUNCIONES LOCALES
	const handleClickOnCheckButton = () => {

		dispatch( startCreatingNewExpense() );
	}

	useEffect(() => {

		const { date, amount, category, establishment } = newExpense;
		if ( isEmpty(date) || isEmpty(amount) || isEmpty(category.name) || isEmpty(establishment.name)) {
			setDisabled( true );
		} else {
			setDisabled( false );
		}

	}, [newExpense])

  	return (
		<div
			className="
				menu_mobile__container
				grid-cols-2
			"
		>
			<BackButton to={ inicioPath } />

			<CheckButton
                isButton
				disabled={ disabled }
                onClick={ handleClickOnCheckButton }
            />

		</div>
  	)
}
