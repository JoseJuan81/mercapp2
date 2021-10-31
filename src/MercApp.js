import { Provider } from 'react-redux';

import { Toast } from './components/Toast';
import { Main } from './router/Main';
import { store } from './store/store';

export const MercApp = () => {

    return (
        <Provider store={ store }>
            <Toast />
            <Main />
        </Provider>
    )
}
