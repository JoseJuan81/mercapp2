import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { newPurchaseReducer } from '../reducers/newPurchaseReducer';
import { establishmentReducer } from '../reducers/establishmentReducer';
// import { errorsReducer } from '../reducers/errorsReducer';
import { insumosReducer } from '../reducers/insumosReducer';
import { loadingReducer } from '../reducers/loadingReducer';
import { newInsumoReducer } from '../reducers/newInsumoReducer';
import { searchInsumosReducer } from '../reducers/searchInsumosReducer';
import { purchasesReducer } from '../reducers/purchaseReducer';
import { insumoDetailsReducer } from '../reducers/insumoDetailsReducer';

import { type } from '../constant/type';
import { newExpenseReducer } from '../reducers/newExpenseReducer';
import { userReducer } from '../reducers/userReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const appReducers = combineReducers({
    auth: authReducer,
    establishments: establishmentReducer,
    loading: loadingReducer,
    insumoDetails: insumoDetailsReducer,
    insumos: insumosReducer,
    newInsumo: newInsumoReducer,
    newPurchase: newPurchaseReducer,
    search: searchInsumosReducer,
    purchases: purchasesReducer,
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