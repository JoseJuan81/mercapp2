import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { MiListadoComprasContainer } from '../../components/Container/Purchases/MiListadoComprasContainer';

import {
    inicioPath,
    listaComprasPath,
} from '../../constant/routes';

export const PurchasesListRoutes = () => {
  return (
    <Switch>
        <Route exact path={ listaComprasPath }>
            <MiListadoComprasContainer />
        </Route>

        <Redirect to={ inicioPath } />
        
    </Switch>
  )
}
