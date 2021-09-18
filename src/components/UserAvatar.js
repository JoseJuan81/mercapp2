import React from 'react'

export const UserAvatar = ({ user }) => {
    return (
        <>
            {user.avatar
                ?   <img
                        className="
                            rounded-full
                            w-16 h-16
                        "
                        src={ user.avatar }
                        alt="imagen del usuario"
                    />
                :   <div
                        className="
                            w-16 h-16
                            text-5xl
                            flex items-center justify-center
                        "
                    >
                        <i className="far fa-user"></i>
                    </div>

            }
        </>
    )
}
