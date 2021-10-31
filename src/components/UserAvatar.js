import React from 'react';

export const DefaultAvatar = React.memo(() => {
    return (
        <div
            className="
                w-16 h-16
                text-4xl text-warmGray-800
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
        <>
            {user.avatar
                ?   <Avatar avatar={ user.avatar } />
                :   <DefaultAvatar />

            }
        </>
    )
})
