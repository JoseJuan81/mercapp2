import React from 'react';
import { useDispatch } from 'react-redux';

import { startCreatingNewExpense } from '../../actions/newExpenseAction';

import { CheckButton } from '../Buttons/AppButtons';

export const NewExpenseMenuMobile = () => {

	// STORE
	const dispatch = useDispatch();

	// FUNCIONES LOCALES
	const handleClickOnCheckButton = () => {

		dispatch( startCreatingNewExpense() );
	}

  	return (
		<div
			className="
				menu_mobile__container
				grid-cols-1
			"
		>
			<CheckButton
                isButton
                onClick={ handleClickOnCheckButton }
            />
		</div>
  	)
}
