import React from 'react';

import { expensesUrls } from '../../constant/routes';

import { ShoppingCarPlusButton } from '../Buttons/AppButtons';

export const InicioAppMenuMobile = () => {
  return (
    <div
        className="
            menu_mobile__container
            grid-cols-1
        "
    >
        <ShoppingCarPlusButton
            to={ expensesUrls.new() }
        />
    </div>
  )
}
