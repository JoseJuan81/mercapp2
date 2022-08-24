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


export const fetchCurrency = () => {
    const IP_URL = 'https://api.ipify.org?format=json';
    const COUNTRY_URL = 'http://www.geoplugin.net/json.gp?ip=';

    return fetch(IP_URL)
        .then(res => res.json())
        .then(data => fetch( COUNTRY_URL + data.ip ))
        .then(res => res.json())
        .then(data => ({ code: data.geoplugin_currencyCode, symbol: data.geoplugin_currencySymbol }))
}
