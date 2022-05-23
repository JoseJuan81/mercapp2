import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
    inicioPath, insumosBaseUrl, purchasesBaseUrl,
} from '../constant/routes';

import { NavBar } from '../components/NavBar.js';

import { PaginaInicioApp } from '../Pages/PaginaInicioApp';

import { InsumosRoutes } from './routes/InsumosRoutes';
import { PurchasesRoutes } from './routes/PurchasesRoutes';

export const AppRoutes = () => {

    return (
        <div className="w-screen h-screen">
            <NavBar />

            <div className="layout__container">
                <Switch>

                    <Route path={ inicioPath }>
                        <PaginaInicioApp />
                    </Route>

                    <Route path={ insumosBaseUrl }>
                        <InsumosRoutes />
                    </Route>
                    
                    <Route path={ purchasesBaseUrl }>
                        <PurchasesRoutes />
                    </Route>

                    <Redirect to={ inicioPath } />

                </Switch>
            </div>
        </div>
    )
}
