import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { buyReducer } from '../reducers/buyReducer';
// import { errorsReducer } from '../reducers/errorsReducer';
import { insumosReducer } from '../reducers/insumosReducer';
import { loadingReducer } from '../reducers/loadingReducer';
import { newInsumoReducer } from '../reducers/newInsumoReducer';
import { searchInsumosReducer } from '../reducers/searchInsumosReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    loading: loadingReducer,
    insumos: insumosReducer,
    newInsumo: newInsumoReducer,
    search: searchInsumosReducer,
    buy: buyReducer,
    // error: errorsReducer
})

export const store = createStore(
	reducers,
	composeEnhancers(
        applyMiddleware( thunk )
    )
);