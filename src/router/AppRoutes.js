import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'functionallibrary';

import {
    expensesUrls,
    inicioPath,
    userUrls,
} from '../constant/routes';

import { NavBar } from '../components/NavBar.js';
import { HomeContainer } from '../components/Container/Home/HomeContainer';

import { UserRoutes } from './routes/UserRoutes';
import { ExpensesRoutes } from './routes/ExpensesRoutes';

import { fetchingUserData } from '../actions/userAction';

export const AppRoutes = () => {

    // store
    const dispatch = useDispatch();
    const userData = useSelector( store => store.user );
    
    useEffect( () => {
        
        if ( isEmpty( userData.name )) {

            dispatch( fetchingUserData() );
        }

    }, [])

    return (
        <div className="w-screen h-screen">
            <NavBar />

            <div className="layout__container">
                <Switch>

                    <Route path={ inicioPath }>
                        <HomeContainer />
                    </Route>

                    <Route path={ userUrls.urlBase }>
                        <UserRoutes />
                    </Route>

                    <Route path={ expensesUrls.urlBase }>
                        <ExpensesRoutes />
                    </Route>

                    <Redirect to={ inicioPath } />

                </Switch>
            </div>
        </div>
    )
}
