export const inicioPath = '/inicio';
export const inicioSesionPath = '/inicio-sesion';
export const registroUsuarioPath = '/registro-usuario';

class Route {
    constructor(urlBase) {
        this.urlBase = `/${urlBase}/`;
        this.urlNew = 'nuevo'
        this.urlDetails = 'detalle'
    }

    new() {
        return this.urlBase + this.urlNew;
    }

    details() {
        return this.urlBase + this.urlDetails;
    }
}

export const userUrls = new Route('usuario');

export const expensesUrls = new Route('gastos');
