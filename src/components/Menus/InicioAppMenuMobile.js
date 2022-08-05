import React from 'react';

import { expensesUrls } from '../../constant/routes';

import { ListButton, ShoppingCarPlusButton } from '../Buttons/AppButtons';

export const InicioAppMenuMobile = () => {
  return (
    <div
        className="
			menu_mobile__container
			grid-cols-2
        "
    >
		<ListButton
			to={ expensesUrls.list() }
		/>

        <ShoppingCarPlusButton
            to={ expensesUrls.new() }
        />
    </div>
  )
}
