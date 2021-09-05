import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { isEmpty } from 'functionallibrary';

import { registroUsuarioPath } from '../constant/routes';
import { startGoogleLogIn, startLoginWithEmailAndPassword } from '../actions/auth';
import { useForm } from '../hooks/useForm';
import { InputField } from '../components/Form/InputField';

const formFields = {
    email: '',
    password: '',
}

export const PaginaInicioSesion = () => {

    const dispatch = useDispatch();

    const { formState, handleInputChange, invalidForm } = useForm({ ...formFields });
    const [formError, setFormError] = useState({ ...formFields, noErrors: false, });

    const { email, password } = formState;

    const handleLogIn = (ev) => {
        ev.preventDefault();

        formChecking();

        if ( formError.noErrors ) {
            
            dispatch( startLoginWithEmailAndPassword( formState ) );        
        }
    }

    const handleGoogleSignIn = () => {

        dispatch( startGoogleLogIn() );
    }

    const formChecking = () => {
        let errors = { ...formFields, noErrors: true };
        
        if ( !validator.isEmail( email ) ) {
            errors = { ...errors, noErrors: false, email: 'El correo es invalido' };
        }

        if ( isEmpty( email ) ) {
            errors = { ...errors, noErrors: false, email: 'El correo es requerido' };
        }
        
        if ( !validator.isLength( password, { min: 6, max: 16 } ) ) {
            errors = { ...errors, noErrors: false, password: 'La contrasena debe tener entre 6 y 16 caracteres' };
        }

        if ( isEmpty( password ) ) {
            errors = { ...errors, noErrors: false, password: 'La contrasena es requerida' };
        }

        setFormError({ ...errors });

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

                <fieldset
                    className="mb-2"
                >
                    <InputField
                        placeholder="Introduzca su correo"
                        type="text"
                        name="email"
                        value={ email }
                        onChange={ handleInputChange }
                        onBlur={ formChecking }
                        error={ formError.email }
                    />
                </fieldset>
                <fieldset
                    className="mb-2"
                >
                    <InputField
                        placeholder="Introduzca su contrasena"
                        type="password"
                        name="password"
                        value={ password }
                        onChange={ handleInputChange }
                        onBlur={ formChecking }
                        error={ formError.password }
                    />
                </fieldset>
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
