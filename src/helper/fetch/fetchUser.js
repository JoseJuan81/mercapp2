import { FetchClass } from ".";

class FetchUser extends FetchClass {
    constructor(urlLogin) {
        super()
        this.url = this.urlBase + urlLogin;
    }
    
    data() {
        return this.buildGetFetch( this.url ).then( response => response.json() );
    }

    update( body ) {
        return this.buildPostOrPutFetch( this.url, body, 'PUT' ).then( (res) => res.json() );
    }

}

export const fetchUser = new FetchUser('/user');