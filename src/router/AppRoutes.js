import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { NavBar } from '../components/NavBar/NavBar';
import { InsumoStore } from '../context/Insumo/insumoWrapperContext';
import { PaginaInsumos } from '../Pages/PaginaInsumos';
import { PaginaInsumosAComprar } from '../Pages/PaginaInsumosAComprar';

import { listaDeComprasPath, misInsumosPath, resumenDeComprasPath } from '../constant/routes';
import { PaginaResumenCompras } from '../Pages/PaginaResumenCompras';

export const AppRoutes = () => {
    return (
        <InsumoStore>
            <NavBar />

            <div>
                <Switch>

                    <Route exact path={ resumenDeComprasPath }>
                        <PaginaResumenCompras />
                    </Route>

                    <Route exact path={ listaDeComprasPath }>
                        <PaginaInsumosAComprar />
                    </Route>

                    <Route exact path={ misInsumosPath }>
                        <PaginaInsumos />
                    </Route>

                    <Redirect to={ resumenDeComprasPath } />

                </Switch>
            </div>
        </InsumoStore>
    )
}
