import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { NewExpenseContainer } from '../../components/Container/Expenses/NewExpenseContainer';

import { expensesUrls, inicioPath } from '../../constant/routes';

export const ExpensesRoutes = () => {
    return (
        <Switch>
            <Route exact path={ expensesUrls.new }>
                <NewExpenseContainer />
            </Route>

            <Redirect to={ inicioPath } />
        </Switch>
    )
}