import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';

import { PrivateRoutes } from './PrivateRoutes';
import { AppRoutes } from './AppRoutes';

import { PaginaRegistroUsuario } from '../Pages/PaginaRegistroUsuario';
import { PaginaInicioSesion } from '../Pages/PaginaInicioSesion';

import { inicioSesionPath, registroUsuarioPath } from '../constant/routes';
import { getFromLocalStorage } from '../helper/localStorage';
import { userKey } from '../constant/user';
import { login } from '../actions/auth';

export const Main = () => {

    const userFromLocalStore = getFromLocalStorage( userKey );
    const userFromStore = useSelector( state => state.auth );
    const user =  userFromLocalStore || userFromStore;

    const dispatch = useDispatch();

    useEffect(() => {
    
        if ( userFromLocalStore ) {

            dispatch( login( userFromLocalStore ) );
        }
        
    }, [])

    return (
        <div className="font-mercapp">

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
