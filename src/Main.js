import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import { PaginaInsumos } from './Pages/PaginaInsumos';
import { NavBar } from './components/NavBar/NavBar';

export const Main = () => {
    return (
        <div className="font-poppins">
            <NavBar />

            <Router>

                <Switch>

                    <Route exact path="/">
                        <PaginaInsumos />
                    </Route>

                </Switch>

            </Router>
        </div>
    )
}
