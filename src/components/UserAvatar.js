import React from 'react';
import { NavLink } from 'react-router-dom';

import { userUrls } from '../constant/routes';

export const DefaultAvatar = React.memo(() => {
    return (
        <div
            className="
                w-16 h-16
                text-4xl text-warmGray-500
                flex items-center justify-center
            "
        >
            <i className="far fa-user"></i>
        </div>
    )
})

const Avatar = React.memo(({ avatar }) => {
    return (
        <img
            className="
                rounded-full
                w-16 h-16
            "
            src={ avatar }
            alt="imagen del usuario"
        />        
    )
})

export const UserAvatar = React.memo(({ user }) => {
    return (
        <NavLink to={ userUrls.info }>
            {user.avatar
                ?   <Avatar avatar={ user.avatar } />
                :   <DefaultAvatar />

            }
        </NavLink>
    )
})
