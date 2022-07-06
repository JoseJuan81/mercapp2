import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
    expensesUrls,
    inicioPath,
    insumosBaseUrl,
    purchasesBaseUrl,
    purchasesListBaseUrl,
    userUrls,
} from '../constant/routes';

import { NavBar } from '../components/NavBar.js';

import { InsumosRoutes } from './routes/InsumosRoutes';
import { PurchasesRoutes } from './routes/PurchasesRoutes';
import { PurchasesListRoutes } from './routes/PurchasesListRoutes';
import { UserRoutes } from './routes/UserRoutes';
import { HomeContainer } from '../components/Container/Home/HomeContainer';
import { ExpensesRoutes } from './routes/ExpensesRoutes';

export const AppRoutes = () => {

    return (
        <div className="w-screen h-screen">
            <NavBar />

            <div className="layout__container">
                <Switch>

                    <Route path={ inicioPath }>
                        <HomeContainer />
                    </Route>

                    <Route path={ insumosBaseUrl }>
                        <InsumosRoutes />
                    </Route>
                    
                    <Route path={ purchasesBaseUrl }>
                        <PurchasesRoutes />
                    </Route>

                    <Route path={ purchasesListBaseUrl }>
                        <PurchasesListRoutes />
                    </Route>

                    <Route path={ userUrls.baseUrl }>
                        <UserRoutes />
                    </Route>

                    <Route path={ expensesUrls.baseUrl }>
                        <ExpensesRoutes />
                    </Route>

                    <Redirect to={ inicioPath } />

                </Switch>
            </div>
        </div>
    )
}
