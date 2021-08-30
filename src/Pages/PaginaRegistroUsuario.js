import { isEmpty } from 'functionallibrary';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { startRegisterWithNameEmailAndPassword } from '../actions/auth';
import { InputField } from '../components/Form/InputField';
import { inicioSesionPath } from '../constant/routes';
import { useForm } from '../hooks/useForm';

const formFields = {
    email: '',
    name: '',
    password: '',
    password2: '',
}

export const PaginaRegistroUsuario = () => {

    const dispatch = useDispatch();

    const { formState, handleInputChange } = useForm({ ...formFields });
    const [formError, setFormError] = useState({ ...formFields, noErrors: false, });

    const { email, name, password, password2 } = formState;

    const handleRegister = (ev) => {
        ev.preventDefault();

        formChecking();

        if ( formError.noErrors ) {

            dispatch( startRegisterWithNameEmailAndPassword( formState ) );

        }        
    }

    const formChecking = () => {
        let errors = { ...formFields, noErrors: true };

        if ( !validator.isLength( name, { min: 4 }) ) {
            errors = { ...errors, noErrors: false, name: 'El nombre debe tener mas de 4 caracteres' };
        }

        if ( isEmpty(name) ) {
            errors = { ...errors, noErrors: false, name: 'El nombre es requerido' };
        }
        
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
          
        if ( password !== password2 ) {
            errors = { ...errors, noErrors: false, password2: 'Las contrasenas no son iguales' };
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

                <fieldset
                    className="mb-2"
                >
                    <InputField
                        autoComplete="off"
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={ name }
                        onChange={ handleInputChange }
                        onBlur={ formChecking }
                        error={ formError.name }
                    />

                </fieldset>
                <fieldset
                    className="mb-2"
                >
                    <InputField
                        name="email"
                        placeholder="Correo"
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
                        name="password"
                        placeholder="Contrasena"
                        type="password"
                        value={ password }
                        onChange={ handleInputChange }
                        onBlur={ formChecking }
                        error={ formError.password }
                    />

                </fieldset>
                <fieldset
                    className="mb-2"
                >
                    <InputField
                        name="password2"
                        placeholder="Confirmar contrasena"
                        type="password"
                        value={ password2 }
                        onChange={ handleInputChange }
                        onBlur={ formChecking }
                        error={ formError.password2 }
                    />

                </fieldset>
                <button
                    className={`
                        w-full h-16
                        bg-lime-200
                        text-lime-700 text-xl
                        rounded
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
