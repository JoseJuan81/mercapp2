import { map, orderBy, upperFirst } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';

import { getFormatDate } from '../../helper/dates';

export const PaginaExpensesList = () => {

    // STORE
    const { currencies, expenses } = useSelector( store => store.user );

	// VARIABLES LOCALES
	const descExpenses = orderBy( expenses, ["date"], ["desc"] );
	const [currency] = currencies;

	return (
	<div
		className="
			px-2
		"
	>
		Filtro por Día - Semana - Mes - Todo

		<ExpensesTable expenses={ descExpenses } currency={ currency.symbol } />
	</div>
	)
}

const ExpensesTable = ({ currency, expenses }) => {

    return (
        <ul
			className="
			
			"
		>
            {map(expenses, (val, k) => (
                <li
                    key={ val.id + k }
					className="
						grid grid-cols-5
					"
                >
                    <span>{ currency + val.amount }</span>
                    <span>{ upperFirst( val.category.name ) }</span>
                    <span>{ upperFirst( val.establishment.name ) }</span>
                    <span>{ getFormatDate( val.date ) }</span>
					<div>Acciones</div>
                </li>
            ))}
        </ul>
    )
}
