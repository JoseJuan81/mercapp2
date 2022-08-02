export const inicioPath = '/inicio';
export const inicioSesionPath = '/inicio-sesion';
export const registroUsuarioPath = '/registro-usuario';

class Route {
    constructor(urlBase) {
        this.urlBase = `/${urlBase}/`;
        this.urlNew = 'nuevo';
        this.urlDetails = 'detalle';
        this.urlList  = 'listado';
    }

    new() {
        return this.urlBase + this.urlNew;
    }

    details() {
        return this.urlBase + this.urlDetails;
    }

    list() {
        return this.urlBase + this.urlList;
    }
}

export const userUrls = new Route('usuario');

export const expensesUrls = new Route('gastos');
