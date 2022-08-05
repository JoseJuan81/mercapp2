import React from 'react';

import { inicioPath } from '../../constant/routes';
import { BackButton } from '../Buttons/AppButtons';

export const ExpensesListMenuMobile = () => {
  return (
    <div
        className="
        menu_mobile__container
        grid grid-cols-1
    "
    >
        <BackButton to={ inicioPath } />
    </div>
  )
}
