import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

import { type } from '../constant/type';

export const LogoutNotification = () => {
    return (
        <div
            className="
                border border-solid border-lime-600
                bg-lime-50 text-lime-600
                rounded
                py-2 px-4
                flex items-center
            "
        >
            <span
                className="
                    text-3xl mr-2
                "
            >🥺</span>
            <span
                className="
                    text-xl
                "
            >{ type.notificationMessages.logout }</span>
        </div>
    )
}

export const LoginNotification = () => {
    return (
        <div
            className="
                border border-solid border-lime-600
                bg-lime-50 text-lime-600
                rounded
                py-2 px-4
                flex items-center
            "
        >
            <span
                className="
                    text-3xl mr-2
                "
            >🕙</span>
            <span
                className="
                    text-xl
                "
            >{ type.notificationMessages.login }</span>
        </div>
    )
}
export const WelcomeNotification = () => {
    return (
        <div
            className="
                border border-solid border-lime-600
                bg-lime-50 text-lime-600
                rounded
                py-2 px-4
                flex items-center
            "
        >
            <span
                className="
                    text-3xl mr-2
                "
            >🎉</span>
            <span
                className="
                    text-xl
                "
            >{ type.notificationMessages.welcome }</span>
        </div>
    )
}
export const GoodbyeNotification = () => {
    return (
        <div
            className="
                border border-solid border-wa👋🏽rmGray-400
                bg-white text-warmGray-800
                rounded
                py-2 px-4
                flex items-center
            "
        >
            <span
                className="
                    text-3xl mr-2
                "
            >👋✌🏽</span>
            <span
                className="
                    text-xl
                "
            >{ type.notificationMessages.bye }</span>
        </div>
    )
}

export const Toast = () => {
    return (
        <ToastContainer
            draggable
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
            position="top-right"
            autoClose={3500}
            hideProgressBar={false}
            newestOnTop={false}
            rtl={false}
            icon={false}
        />
    )
}
