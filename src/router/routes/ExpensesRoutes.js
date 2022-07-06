import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { expensesUrls, inicioPath } from '../../constant/routes';

export const ExpensesRoutes = () => {
    return (
        <Switch>
            <Route exact path={ expensesUrls.new }>
                Nuevo Gasto
            </Route>

            <Redirect to={ inicioPath } />
        </Switch>
    )
}