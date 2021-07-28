import React, { useContext } from 'react'
import { UserContext } from './context/User/UserContext';
import { UserStore } from './context/User/userWrapper'
import { Main } from './router/Main';

export const MercApp = () => {

    return (
        <UserStore>
            <Main />
        </UserStore>
    )
}
