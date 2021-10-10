import React from 'react';
import { useSelector } from 'react-redux';
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
import { PageLoading } from '../Pages/PageLoading';

export const AppRoutes = () => {

    const {loading} = useSelector( state => state.loading );

    return (
        <div className="w-screen h-screen">
            <NavBar />

            <div
                className="layout__container"
            >
                <Switch>

                    <Route exact path={ resumenDeComprasPath }>

                        { loading ? <PageLoading /> : <MisComprasContainer /> }

                    </Route>

                    <Route exact path={ misInsumosPath }>

                        { loading ? <PageLoading /> : <MisInsumosContainer /> }

                    </Route>

                    <Route exact path={ nuevaCompraPath }>

                        { loading ? <PageLoading /> : <NuevaCompraContainer /> }
                        
                    </Route>

                    <Route exact path={ nuevoInsumoPath }>

                        { loading ? <PageLoading /> : <NuevoInsumoContainer /> }

                    </Route>
                    
                    <Route exact path={ `${ editarInsumoPath }/:id` }>

                        { loading ? <PageLoading /> : <NuevoInsumoContainer /> }

                    </Route>

                    <Redirect to={ resumenDeComprasPath } />

                </Switch>
            </div>
        </div>
    )
}
