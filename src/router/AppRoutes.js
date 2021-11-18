import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
    detalleComprasPath,
    detalleInsumoPath,
    editarInsumoPath,
    mezclarComprasPath,
    misInsumosPath,
    nuevaCompraPath,
    nuevoInsumoPath,
    resumenDeComprasPath,
} from '../constant/routes';

import { MisComprasContainer } from '../components/Container/MisComprasContainer.js';
import { MisInsumosContainer } from '../components/Container/MisInsumosContainer.js';
import { NuevaCompraContainer } from '../components/Container/NuevaCompraContainer.js';
import { NuevoInsumoContainer } from '../components/Container/NuevoInsumoContainer.js';
import { NavBar } from '../components/NavBar.js';
import { DetalleCompraContainer } from '../components/Container/DetalleCompraContainer';
import { MezclarComprasContainer } from '../components/Container/MezclarComprasContainer';
import { DetalleInsumoContainer } from '../components/Container/DetalleInsumoContainer';

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

                    <Route exact path={ mezclarComprasPath }>

                        <MezclarComprasContainer />

                    </Route>
                    
                    <Route exact path={ `${ editarInsumoPath }/:id` }>

                        <NuevoInsumoContainer />

                    </Route>

                    <Route exact path={ `${ detalleComprasPath }/:id` }>

                        <DetalleCompraContainer />

                    </Route>

                    <Route path={ detalleInsumoPath }>

                        <DetalleInsumoContainer />

                    </Route>

                    <Redirect to={ resumenDeComprasPath } />

                </Switch>
            </div>
        </div>
    )
}
