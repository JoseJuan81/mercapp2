import { buildGetFetch, buildPostOrPutFetch, URLBASE } from ".";

const userBaseUrl = `${ URLBASE }/user`;

export const userFetch = {
    baseURL: userBaseUrl,
    data: () => buildGetFetch( userBaseUrl ).then( response => response.json() ),
    update: ( body ) => {
        return buildPostOrPutFetch( userBaseUrl, body, 'PUT' ).then( (res) => res.json() );
    }
}