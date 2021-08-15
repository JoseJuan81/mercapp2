import React from 'react';
import { useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';

import { PrivateRoutes } from './PrivateRoutes';
import { AppRoutes } from './AppRoutes';
import { PaginaInicioSesion } from '../Pages/PaginaInicioSesion';
import { PaginaRegistroUsuario } from '../Pages/PaginaRegistroUsuario';

import { inicioSesionPath, registroUsuarioPath } from '../constant/routes';

export const Main = () => {

    const user = useSelector( state => state.auth );

    return (
        <div className="font-poppins">

            <Router>
                    <Switch>

                        <Route
                            exact
                            path={ inicioSesionPath }
                            component={
                                props => (
                                    !user.logged
                                    ? <PaginaInicioSesion props={ props } />
                                    : <Redirect to="/" />
                                )
                            }
                        />

                        <Route
                            exact
                            path={ registroUsuarioPath }
                            component={
                                props => (
                                    !user.logged
                                    ? <PaginaRegistroUsuario props={ props } />
                                    : <Redirect to="/" />
                                )
                            }
                        />

                        <PrivateRoutes
                            path="/"
                            isAuthenticated={ user.logged }
                            components={ AppRoutes }
                        />

                    </Switch>

            </Router>

        </div>
    )
}
