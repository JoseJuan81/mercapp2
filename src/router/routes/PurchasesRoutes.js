import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { DetalleCompraContainer } from '../../components/Container/Purchases/DetalleCompraContainer';
import { EstadisticasComprasContainer } from '../../components/Container/Purchases/EstadisticasComprasContainer';
import { ListaComprasContainer } from '../../components/Container/Purchases/ListaComprasContainer';
import { MezclarComprasContainer } from '../../components/Container/Purchases/MezclarComprasContainer';
import { MisComprasContainer } from '../../components/Container/Purchases/MisComprasContainer';
import { NuevaCompraContainer } from '../../components/Container/Purchases/NuevaCompraContainer';

import {
    comprasEstadisticas,
    detalleComprasPath,
    inicioPath,
    listaComprasPath,
    mejorCompraPath,
    mezclarComprasPath,
    nuevaCompraPath,
    resumenDeComprasPath
} from '../../constant/routes';

export const PurchasesRoutes = () => {
  return (
    <Switch>
        <Route exact path={ resumenDeComprasPath }>
            <MisComprasContainer />
        </Route>

        <Route exact path={ nuevaCompraPath }>
            <NuevaCompraContainer />
        </Route>

        <Route exact path={ mejorCompraPath }>
            <NuevaCompraContainer />
        </Route>

        <Route exact path={ listaComprasPath }>
            <ListaComprasContainer />
        </Route>

        <Route path={ comprasEstadisticas }>
            <EstadisticasComprasContainer />
        </Route>

        <Route path={ mezclarComprasPath }>
            <MezclarComprasContainer />
        </Route>

        <Route path={ detalleComprasPath }>
            <DetalleCompraContainer />
        </Route>

        <Redirect to={ inicioPath } />
        
    </Switch>
  )
}
