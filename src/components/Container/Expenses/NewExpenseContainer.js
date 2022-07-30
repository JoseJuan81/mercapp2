import React from 'react';

import { PaginaNewExpense } from '../../../Pages/Expenses/PaginaNewExpense';
import { NewExpenseMenuMobile } from '../../Menus/NewExpenseMenuMobile';

export const NewExpenseContainer = () => {
  return (
    <div
        className="layout__page"
    >
        <PaginaNewExpense />

        <NewExpenseMenuMobile />
    </div>
  )
}
