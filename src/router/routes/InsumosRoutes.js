import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { MisInsumosContainer } from '../../components/Container/Insumos/MisInsumosContainer';
import { NuevoInsumoContainer } from '../../components/Container/Insumos/NuevoInsumoContainer';
import { DetalleInsumoContainer } from '../../components/Container/Insumos/DetalleInsumoContainer';

import {
    detalleInsumoPath,
    editarInsumoPath,
    inicioPath,
    misInsumosPath,
    nuevoInsumoPath
} from '../../constant/routes';

export const InsumosRoutes = () => {

    return (
        <Switch>
            <Route exact path={ misInsumosPath }>
                <MisInsumosContainer />
            </Route>

            <Route exact path={ nuevoInsumoPath }>
                <NuevoInsumoContainer />
            </Route>

            <Route exact path={ `${ editarInsumoPath }/:id` }>
                <NuevoInsumoContainer />
            </Route>
            
            <Route path={ detalleInsumoPath }>
                <DetalleInsumoContainer />
            </Route>

            <Redirect to={ inicioPath } />

        </Switch>
    )
}
