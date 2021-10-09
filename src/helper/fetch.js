
const urlBase = process.env.REACT_APP_URLBASE;

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