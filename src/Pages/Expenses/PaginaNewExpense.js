import React from 'react';

import { DataList } from '../../components/Form/DataList';
import { InputField } from '../../components/Form/InputField'

export const PaginaNewExpense = () => {
	return (
		<div>
			<form>
				<fieldset>
					<InputField
                        type="date"
                        placeholder="dd/mm/aaaa"
                    />
				</fieldset>

				<fieldset>
					<DataList
                        autoFocus
                        placeholder="Establecimiento"
						options={ [] }
                    />
				</fieldset>

				<fieldset>
					<InputField
                        type="number"
                        placeholder="monto del gasto"
                    />
				</fieldset>

				<fieldset>
					<InputField
                        type="text"
                        placeholder="Descripción"
                    />
				</fieldset>

				<fieldset>
					<DataList
                        autoFocus
                        placeholder="Categoría"
						options={ [] }
                    />
				</fieldset>
			</form>
		</div>
	)
}
