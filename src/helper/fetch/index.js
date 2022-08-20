import { type } from "../../constant/type";

import { getFromLocalStorage } from "../localStorage";

export const URLBASE = process.env.REACT_APP_URLBASE;

/// ===== UTILIDADES PARA SERVICIOS WEB =====
export class FetchClass {
    constructor() {
        this.urlBase = URLBASE;
    }

    buildDeleteFetch = ( url ) => {

        const token = getFromLocalStorage( type.localStorage.token );
    
        return fetch(
            url,
            {
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token
                },
                method: 'DELETE',
            },
        )
    }

    buildGetFetch = ( url ) => {

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

    buildPostOrPutFetch = ( url, data, method  ) => {

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
}

/**
 * @description funcion para eliminar de BD
 * @param {string} url 
 */
export const buildDeleteFetch = ( url ) => {

    const token = getFromLocalStorage( type.localStorage.token );

    return fetch(
        url,
        {
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            method: 'DELETE',
        },
    )
}


/**
 * @description función para obtener información de BD
 * @param {string} url 
 */
export const buildGetFetch = ( url ) => {

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
 * @description función para crear o actualizar elemento en BD
 * @param {string} url 
 * @param {object} data 
 * @param {string} method - POST / PUT
 */
export const buildPostOrPutFetch = ( url, data, method  ) => {

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
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @return {object}
 */
export const fetchSignUp = ( name, email, password, currencies ) => {

    const url = `${ URLBASE }/auth/new`;
    return fetch( url, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name, email, password, currencies })
    })
    .then( ( res ) => res.json() );
}

export const fetchInsumos = () => {

    const url = `${ URLBASE }/insumos`;
    return buildGetFetch( url ).then( (res) => res.json() );
}

export const fetchInsumo = async ( id ) => {

    const url = `${ URLBASE }/insumos/${ id }`;

    const res = await buildGetFetch( url );
    const data = await res.json();
    
    return new Promise( ( resolve, reject ) => {
        if ( data.ok ) resolve( data );

        reject( data );
    })
}

/**
 * @description Crear un insumo
 * @param {object} body 
 */
export const fetchCreateInsumo = ( body ) => {
    
    const url = `${ URLBASE }/insumos`;
    return buildPostOrPutFetch( url, body, 'POST' ).then( (res) => res.json() );
}

/**
 * @description Editar un insumo
 * @param {object} body 
 */
export const fetchUpdateInsumo = ( body ) => {
    
    const url = `${ URLBASE }/insumos/${ body.id }`;
    return buildPostOrPutFetch( url, body, 'PUT' ).then( (res) => res.json() );
}

/**
 * @description Eliminar insumo

 */
export const fetchDeleteInsumo = ( id ) => {

    const url = `${ URLBASE }/insumos/${ id }`;
    return buildDeleteFetch( url ).then( (res) => res.json() );
}

/**
 * @description Actualizar un insumo favorito
 * @param {object} body 
 */
export const fetchFavorite = ( body ) => {
    
    return fetchUpdateInsumo( body );
}

/**
 * @description Listar establecimientos

 */
export const fetchEstablishments = () => {

    const url = `${ URLBASE }/establishments`;
    return buildGetFetch( url ).then( (res) => res.json() );
}

// ========== COMPRA ==========
/**
 * @description Crear nueva compra o mercado
 */
export const fetchCreatePurchase = ( body ) => {

    const url = `${ URLBASE }/purchases/new`;
    return buildPostOrPutFetch( url, body, 'POST' ).then( (res) => res.json() );
}

/**
 * @description Obtener listado de compras

 */
export const fetchAllPurchases = () => {

    const url = `${ URLBASE }/purchases`;
    return buildGetFetch( url ).then( (res) => res.json() );
}
/**
 * @description Obtener una compra

 */
export const fetchPurchase = ( id ) => {

    const url = `${ URLBASE }/purchases/${ id }`;
    return buildGetFetch( url ).then( (res) => res.json() );
}

/**
 * @description Eliminar Compra
    @param {string} id
 */
export const fetchDeletePurchase = ( id ) => {

    const url = `${ URLBASE }/purchases/${ id }`;
    return buildDeleteFetch( url ).then( (res) => res.json() );
}

/**
 * @description Editar una compra
 * @param {object} body 
 */
export const fetchUpdatePurchase = ( body ) => {
    
    const url = `${ URLBASE }/purchases/${ body.id }`;
    return buildPostOrPutFetch( url, body, 'PUT' ).then( (res) => res.json() );
}

export const fetchCurrency = () => {
    const IP_URL = 'https://api.ipify.org?format=json';
    const COUNTRY_URL = 'http://www.geoplugin.net/json.gp?ip=';

    return fetch(IP_URL)
        .then(res => res.json())
        .then(data => fetch( COUNTRY_URL + data.ip ))
        .then(res => res.json())
        .then(data => ({ code: data.geoplugin_currencyCode, symbol: data.geoplugin_currencySymbol }))
}