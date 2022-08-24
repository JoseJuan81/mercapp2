import { FetchClass } from ".";

class FetchSignUp extends FetchClass {
    constructor(urlLogin) {
        super()
        this.url = this.urlBase + urlLogin;
    }

    new( name, email, password, currencies ) {
        const url = this.url + '/new';
        return fetch( url, {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ name, email, password, currencies })
        })
        .then( ( res ) => res.json() );
    }
}

export const fetchSignUp = new FetchSignUp('/auth');

 