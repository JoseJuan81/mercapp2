import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { UserContainer } from '../../components/Container/User/UserContainer';

import { inicioPath, userUrls } from '../../constant/routes';

export const UserRoutes = () => {
    return (
        <Switch>
            <Route exact path={ userUrls.info }>
                <UserContainer />
            </Route>

            <Redirect to={ inicioPath } />
        </Switch>
    )
}