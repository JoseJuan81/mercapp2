import { Provider } from 'react-redux';

import { Main } from './router/Main';
import { store } from './store/store';

export const MercApp = () => {

    return (
        <Provider store={ store }>
            <Main />
        </Provider>
    )
}
