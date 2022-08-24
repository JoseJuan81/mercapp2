import { FetchClass } from ".";

class FetchLogin extends FetchClass {
    constructor(urlLogin) {
        super()
        this.url = this.urlBase + urlLogin;
    }

    login( email, password ) {
        const headers = {
            'Content-type': 'application/json'
        };
        const method = 'POST';
        const body = JSON.stringify({ email, password });

        return fetch(
            this.url,
            { headers, method, body }
        ).then( ( res ) => res.json() );
    }
}

export const fetchLogin = new FetchLogin('/auth');

 