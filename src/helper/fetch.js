import { type } from "../constant/type";

import { getFromLocalStorage } from "./localStorage";

const urlBase = process.env.REACT_APP_URLBASE;

/// ===== UTILIDADES PARA SERVICIOS WEB =====

/**
 * 
 * @param {string} url 
 */
const buildGetFetch = ( url ) => {

    const token = getFromLocalStorage( type.localStorage.token );

    return fetch(
        url,
        {
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            method: 'GET',
        },
    )
}

/**
 * 
 * @param {string} url 
 * @param {object} data 
 * @param {string} method - POST / PUT
 */
const buildPostOrPutFetch = ( url, data, method  ) => {

    const token = getFromLocalStorage( type.localStorage.token );
    
    const body = JSON.stringify( data );

    return fetch(
        url,
        {
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            method,
            body,
        }
    )
}

/// ===== SERVICIOS WEB =====

/**
 * 
 * @param {string} email 
 * @param {string} password 
 */
export const fetchLogin = ( email, password ) => {

    const url = `${ urlBase }/auth`;
    return fetch( url, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ email, password })
    })
    .then( ( res ) => res.json() );
}

/**
 * 
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @return {object}
 */
export const fetchSignUp = ( name, email, password ) => {

    const url = `${ urlBase }/auth/new`;
    return fetch( url, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name, email, password })
    })
    .then( ( res ) => res.json() );
}

export const fetchInsumos = () => {

    const url = `${ urlBase }/insumos`;
    return buildGetFetch( url ).then( (res) => res.json() );
}

export const fetchInsumo = async ( id ) => {

    const url = `${ urlBase }/insumos/${ id }`;

    const res = await buildGetFetch( url );
    const data = await res.json();
    
    return new Promise( ( resolve, reject ) => {
        if ( data.ok ) {
            resolve( data )
        }

        reject( data );
    })
}

/**
 * @description Crear un insumo
 * @param {object} body 
 */
export const fetchCreateInsumo = ( body ) => {
    
    const url = `${ urlBase }/insumos`;
    return buildPostOrPutFetch( url, body, 'POST' ).then( (res) => res.json() );
}

/**
 * @description Editar un insumo
 * @param {string} id 
 * @param {object} body 
 */
export const fetchUpdateInsumo = ( body ) => {
    
    const url = `${ urlBase }/insumos/${ body.id }`;
    return buildPostOrPutFetch( url, body, 'PUT' ).then( (res) => res.json() );
}

/**
 * @description Listar establecimientos

 */
export const fetchEstablishments = () => {

    const url = `${ urlBase }/establishments`;
    return buildGetFetch( url ).then( (res) => res.json() );
}

/**
 * @description Crear nueva compra o mercado

 */
export const fetchCreatePurchase = ( body ) => {

    const url = `${ urlBase }/purchases/new`;
    return buildPostOrPutFetch( url, body, 'POST' ).then( (res) => res.json() );
}

/**
 * @description Obtener listado de compras

 */
export const fetchAllPurchases = () => {

    const url = `${ urlBase }/purchases`;
    return buildGetFetch( url ).then( (res) => res.json() );
}