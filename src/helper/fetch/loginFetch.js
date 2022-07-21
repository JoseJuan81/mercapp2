import { URLBASE } from ".";

const loginBaseUrl = `${ URLBASE }/auth`;

const headers = {
    'Content-type': 'application/json'
};
const method = 'POST';
const getBody = ( email, password ) => JSON.stringify({ email, password })


/**
 * 
 * @param {string} email 
 * @param {string} password 
 */
 export const loginFetch = {
    baseURL: loginBaseUrl,
    login: ( email, password ) => {
        return fetch(
            loginBaseUrl,
            { headers, method, body: getBody( email, password ) }
        ).then( ( res ) => res.json() );
    }
 }
 