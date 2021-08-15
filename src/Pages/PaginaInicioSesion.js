import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { registroUsuarioPath, resumenDeComprasPath } from '../constant/routes';
import { login, startGoogleLogIn } from '../actions/auth';
import { useForm } from '../hooks/useForm';

export const PaginaInicioSesion = () => {

    const dispatch = useDispatch();

    const history = useHistory();

    const { formState, handleInputChange, invalidForm } = useForm({
        email: '',
        password: ''
    });

    const handleLogIn = (ev) => {
        ev.preventDefault();

        dispatch( login( formState ) );
        
        history.replace( resumenDeComprasPath );
    }

    const handleGoogleSignIn = () => {

        dispatch( startGoogleLogIn() );
    }

    return (
        <div
            className="
                flex flex-col items-center justify-center
                h-screen
                px-2 mx-auto
                max-w-xl
            "
        >
            <h2
                className="
                    font-medium
                    text-xl text-warmGray-600
                    mb-4
                "
            >
                Inicio de sesion
            </h2>

            <form
                className="
                    animate__animated animate__jello
                    flex flex-col
                    py-6 px-4 mx-4
                    w-full
                    border border-solid border-warmGray-200
                    rounded-xl shadow-lg
                "
                onSubmit={ handleLogIn }
            >
                <h1
                    className="
                        text-4xl font-semibold text-lime-500 text-center
                        pb-4 mb-2
                    "
                >
                    MercApp 2
                </h1>

                <input
                    required
                    className="
                        w-full h-16
                        border border-solid border-warmGray-200
                        rounded
                        pl-4 pr-2 mb-4
                    "
                    placeholder="Introduzca su correo"
                    type="email"
                    name="email"
                    value={ formState.email }
                    onChange={ handleInputChange }
                />
                <input
                    required
                    className="
                        w-full h-16
                        border border-solid border-warmGray-200
                        rounded
                        pl-4 pr-2 mb-4
                    "
                    placeholder="Introduzca su contrasena"
                    type="password"
                    name="password"
                    maxLength={ 16 }
                    minLength={ 6 }
                    value={ formState.password }
                    onChange={ handleInputChange }
                />
                <button
                    disabled={ invalidForm }
                    className={`
                        btn
                        bg-lime-200
                        text-lime-700 text-xl
                        ${invalidForm && 'opacity-30'}
                    `}
                >
                    Inicia sesion
                </button>

                <div 
                    className="
                        btn
                        my-4
                        grid grid-cols-5 items-center
                        bg-blue-500 text-white
                        border border-solid border-blue-500
                    "
                    onClick={ handleGoogleSignIn }
                >
                    <div
                        className="
                            bg-white
                            rounded-l
                            px-4
                            h-full
                            flex justify-center items-center
                        "
                    >
                        <img
                            className="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="google button"
                        />
                    </div>
                    <p className="col-span-4 text-center text-xl font-medium">
                        Usa tu cuenta google
                    </p>
                </div>

                <Link
                    className="
                        bg-warmGray-100
                        text-center text-warmGray-700
                        py-2 mt-4
                    "
                    to={ registroUsuarioPath }
                >Registrarme</Link>
            </form>

        </div>
    )
}
