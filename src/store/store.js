import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { insumosReducer } from '../reducers/insumosReducer';
import { newInsumoReducer } from '../reducers/newInsumoReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    newInsumo: newInsumoReducer,
    insumos: insumosReducer
})

export const store = createStore(
	reducers,
	composeEnhancers(
        applyMiddleware( thunk )
    )
);