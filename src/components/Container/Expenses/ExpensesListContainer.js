import React from 'react';

import { PaginaExpensesList } from '../../../Pages/Expenses/PaginaExpensesList';
import { ExpensesListMenuMobile } from '../../Menus/ExpensesListMenuMobile';


export const ExpensesListContainer = () => {
  return (
    <div
        className="layout__page"
    >
        <PaginaExpensesList />

        <ExpensesListMenuMobile />
    </div>
  )
}
