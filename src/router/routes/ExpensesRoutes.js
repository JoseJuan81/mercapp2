import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ExpensesListContainer } from '../../components/Container/Expenses/ExpensesListContainer';
import { NewExpenseContainer } from '../../components/Container/Expenses/NewExpenseContainer';

import { expensesUrls, inicioPath } from '../../constant/routes';

export const ExpensesRoutes = () => {
    return (
        <Switch>
            <Route exact path={ expensesUrls.new() }>
                <NewExpenseContainer />
            </Route>

            <Route exact path={ expensesUrls.list() }>
                <ExpensesListContainer />
            </Route>

            <Redirect to={ inicioPath } />
        </Switch>
    )
}