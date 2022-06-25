import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { UserContainer } from '../../components/Container/User/UserContainer';

import { inicioPath, userDataPath } from '../../constant/routes';

export const UserRoutes = () => {
    return (
        <Switch>
            <Route exact path={ userDataPath }>
                <UserContainer />
            </Route>

            <Redirect to={ inicioPath } />
        </Switch>
    )
}