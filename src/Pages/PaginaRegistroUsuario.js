import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { inicioSesionPath } from '../constant/routes';
import { user } from '../constant/user';
import { UserContext } from '../context/User/UserContext';
import { useForm } from '../hooks/useForm';

export const PaginaRegistroUsuario = () => {

    const { dispatch } = useContext( UserContext );

    const history = useHistory();

    const { formState, handleInputChange, invalidForm } = useForm({
        email: '',
        lastname: '',
        name: '',
        password: ''
    }, ['email', 'password', 'name', 'lastname']);

    const handleRegister = (ev) => {
        ev.preventDefault();
        
        dispatch({ type: user.login, payload: formState });
        history.push( inicioSesionPath );
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
                Registro de usuario
            </h2>
            <form
                className="
                    animate__animated animate__rollIn
                    flex flex-col
                    py-6 px-4 mx-4
                    w-full
                    border border-solid border-warmGray-200
                    rounded-xl shadow-lg
                "
                onSubmit={ handleRegister }
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
                        input-form
                        mb-4
                    "
                    placeholder="Nombre"
                    type="text"
                    name="name"
                    value={ formState.name }
                    onChange={ handleInputChange }
                />
                <input
                    required
                    className="
                        input-form
                        mb-4
                    "
                    placeholder="Apellido"
                    type="text"
                    name="lastname"
                    value={ formState.lastname }
                    onChange={ handleInputChange }
                />
                <input
                    required
                    className="
                        input-form
                        mb-4
                    "
                    placeholder="Correo"
                    type="email"
                    name="email"
                    value={ formState.email }
                    onChange={ handleInputChange }
                />
                <input
                    required
                    className="
                        input-form
                        mb-4
                    "
                    placeholder="Contrasena"
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
                    Registrar
                </button>

                <Link
                    className="
                        bg-warmGray-100
                        text-center text-warmGray-700
                        py-2 mt-4
                    "
                    to={ inicioSesionPath }
                >Ya tengo una cuenta</Link>
            </form>

        </div>
    )
}
