import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
// import { errorsReducer } from '../reducers/errorsReducer';
import { loadingReducer } from '../reducers/loadingReducer';

import { type } from '../constant/type';
import { newExpenseReducer } from '../reducers/newExpenseReducer';
import { userReducer } from '../reducers/userReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const appReducers = combineReducers({
    auth: authReducer,
    loading: loadingReducer,
    newExpense: newExpenseReducer,
    user: userReducer,
    // error: errorsReducer
})

const rootReducer = ( state, action ) => {

    if ( action.type === type.auth.logout ) {

        state = undefined
    }
    
    return appReducers( state, action );
}

export const store = createStore(
	rootReducer,
	composeEnhancers(
        applyMiddleware( thunk )
    )
);