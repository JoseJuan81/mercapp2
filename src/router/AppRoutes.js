import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
    misInsumosPath,
    nuevaCompraPath,
    nuevoInsumoPath,
    resumenDeComprasPath,
    editarInsumoPath,
} from '../constant/routes';

import { MisComprasContainer } from '../components/Container/MisComprasContainer.js';
import { MisInsumosContainer } from '../components/Container/MisInsumosContainer.js';
import { NuevaCompraContainer } from '../components/Container/NuevaCompraContainer.js';
import { NuevoInsumoContainer } from '../components/Container/NuevoInsumoContainer.js';
import { NavBar } from '../components/NavBar.js';

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
                    
                    <Route exact path={ `${ editarInsumoPath }/:id` }>

                        <NuevoInsumoContainer />

                    </Route>

                    <Redirect to={ resumenDeComprasPath } />

                </Switch>
            </div>
        </div>
    )
}
