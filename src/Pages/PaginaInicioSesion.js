import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { misInsumosPath, registroUsuarioPath } from '../constant/routes';
import { user } from '../constant/user';
import { UserContext } from '../context/User/UserContext';
import { useForm } from '../hooks/useForm';

export const PaginaInicioSesion = () => {

    const { dispatch } = useContext( UserContext );

    const history = useHistory();

    const { formState, handleInputChange, invalidForm } = useForm({
        email: '',
        password: ''
    }, ['email', 'password']);

    const handleLogIn = (ev) => {
        ev.preventDefault();
        
        dispatch({ type: user.login, payload: formState });
        history.replace( misInsumosPath );
    }

    return (
        <div
            className="
                flex items-center justify-center
                h-screen
            "
        >
            <form
                className="
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
                        w-full h-16
                        bg-lime-200
                        text-lime-700 text-xl
                        rounded
                        ${invalidForm && 'opacity-30'}
                    `}
                >
                    Inicia sesion
                </button>

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
