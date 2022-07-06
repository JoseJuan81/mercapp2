import React from 'react';

export const PaginaInicioApp = () => {
  return (
	<div
		className=""
	>
		<MonthlyExpensesCard
			monthDate="03, July 2022"
			amount={ 927.50 }
			currency="S/."
			average={ 817.35 }
			diferencePercentageToPrevius={ 9.89 }
		/>
		<div>
		Mostrar:
			- Monto acumulado de gastos del mes en curso
			- Top 5 Gastos mas costosos
			- Gasto mensual promedio
			- Acumulado por categorías
			a ver

		</div>
	</div>
  )
}

export const MonthlyExpensesCard = ({ monthDate, amount, currency, average, diferencePercentageToPrevius }) => {
	return (
		<div
			className="
				border border-solid border-warmGray-300 rounded-lg
				mx-4 px-4 pt-4 pb-2	
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

				<ExpenseAverage
					currency={ currency }
					average={ average }
				/>

			</div>
		</div>
	)
}

export const MonthDate = ({ monthDate }) => {
	return (
		<span className="text-lime-500 font-semibold">{ monthDate }</span>
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
						text-4xl font-bold text-warmGray-700
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

			<CompareToPrevius diferencePercentageToPrevius={ diferencePercentageToPrevius } />
			
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
