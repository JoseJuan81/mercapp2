export const insumosBaseUrl = '/insumos/';
export const editarInsumoPath = insumosBaseUrl + 'actualizar';
export const detalleInsumoPath = insumosBaseUrl + 'detalle';
export const misInsumosPath = insumosBaseUrl + 'listado';
export const nuevoInsumoPath = insumosBaseUrl + 'nuevo-insumo';

export const inicioPath = '/inicio';
export const inicioSesionPath = '/inicio-sesion';
export const registroUsuarioPath = '/registro-usuario';

const userUrls = {
    baseUrl: '/usuario/',
}
userUrls.info = userUrls.baseUrl + 'info';
export { userUrls }

const expensesUrls = {
    baseUrl: '/gastos/',
}
expensesUrls.new = expensesUrls.baseUrl + 'nuevo';
export { expensesUrls }