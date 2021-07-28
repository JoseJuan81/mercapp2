import { useEffect, useReducer, useState } from 'react';

import { userKey } from '../../constant/user';
import { getFromLocalStorage, setInLocalStorage } from '../../helper/localStorage';

import { UserContext } from './UserContext';
import { userReducer } from './userReducer';

const init = () => getFromLocalStorage( userKey ) || { logged: false };

export const UserStore = ({ children }) => {

    const [user, dispatch] = useReducer( userReducer, {}, init );

    useEffect( () => { setInLocalStorage( userKey, user ) }, [user]);

    return (
        <UserContext.Provider
            value={{
                user,
                dispatch
            }}
        >
            { children }
        </UserContext.Provider>        
    )
}