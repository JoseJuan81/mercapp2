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

import { PaginaRegistroUsuario } from '../Pages/Auth/PaginaRegistroUsuario';
import { PaginaInicioSesion } from '../Pages/Auth/PaginaInicioSesion';

import { inicioSesionPath, registroUsuarioPath } from '../constant/routes';
import { type } from '../constant/type';

import { getFromLocalStorage } from '../helper/localStorage';

import { login } from '../actions/authAction';

export const Main = () => {

    // VARIABLES LOCALES
    const localUser = getFromLocalStorage( type.localStorage.user ) || {};
    const storeUser = useSelector( store => store.auth );
    const user = localUser || storeUser;


    // STORE
    const dispatch = useDispatch();

    // VERIFICAR SI EL USUARIO YA INICIÓ SESIÓN 
    useEffect(() => {
    
        if ( !storeUser.logged && localUser.logged ) {

            dispatch( login() );
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
