import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { misInsumosPath, nuevaCompraPath, nuevoInsumoPath, resumenDeComprasPath } from '../constant/routes';
import { MisComprasContainer } from '../components/Container/MisComprasContainer';
import { MisInsumosContainer } from '../components/Container/MisInsumosContainer';
import { NuevaCompraContainer } from '../components/Container/NuevaCompraContainer';
import { NuevoInsumoContainer } from '../components/Container/NuevoInsumoContainer';
import { NavBar } from '../components/NavBar';

export const AppRoutes = () => {
    return (
        <div className="w-screen h-screen">
            <NavBar />

            <div
                className="layout__container"
            >
                <Switch>

                    <Route exact path={ resumenDeComprasPath }>
                        <MisComprasContainer />
                    </Route>

                    <Route exact path={ misInsumosPath }>
                        <MisInsumosContainer />
                    </Route>

                    <Route exact path={ nuevaCompraPath }>
                        <NuevaCompraContainer />
                    </Route>

                    <Route exact path={ nuevoInsumoPath }>
                        <NuevoInsumoContainer />
                    </Route>

                    <Redirect to={ resumenDeComprasPath } />

                </Switch>
            </div>
        </div>
    )
}
