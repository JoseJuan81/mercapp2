import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoutes = ({ isAuthenticated, components: Components, ...rest }) => {

    localStorage.setItem( 'lastpath', rest.location.pathname );

    return (
        <>
            <Route
                { ...rest }
                component={
                    props => (
                        isAuthenticated
                        ? <Components { ...props } />
                        : <Redirect to="/inicio-sesion" />
                    )
                }
            />
        </>
    )
}
