import React from 'react';
import { Link } from 'react-router-dom';

import { inicioSesionPath } from '../constant/routes';

export const PaginaRegistroUsuario = () => {
    return (
        <div>
            <h1>Pagina para Registro usuario</h1>

            <button
                type="button"
            >
                Registrate
            </button>

            <Link to={ inicioSesionPath } >Inicar sesion</Link>
        </div>
    )
}
