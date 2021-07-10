import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import { InsumoStore } from './context/InsumoContext';

import { PaginaInsumos } from './Pages/PaginaInsumos';
import { NavBar } from './components/NavBar/NavBar';

import './indexDB';

export const Main = () => {

    return (
        <div className="font-poppins">

            <InsumoStore>
                
                <NavBar />

                <Router>

                    <Switch>

                        <Route exact path="/">
                            <PaginaInsumos />
                        </Route>

                    </Switch>

                </Router>

            </InsumoStore>
        </div>
    )
}
