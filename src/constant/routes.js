export const purchasesBaseUrl = '/compras/';
export const comprasEstadisticas = purchasesBaseUrl + 'estadisticas';
export const detalleComprasPath = purchasesBaseUrl + 'detalle';
export const mejorCompraPath = purchasesBaseUrl + 'nueva-compra/optimizada';
export const mezclarComprasPath = purchasesBaseUrl + 'mezclar-compras';
export const nuevaCompraPath = purchasesBaseUrl + 'nueva-compra';
export const resumenDeComprasPath = purchasesBaseUrl + 'listado';

export const insumosBaseUrl = '/insumos/';
export const editarInsumoPath = insumosBaseUrl + 'actualizar';
export const detalleInsumoPath = insumosBaseUrl + 'detalle';
export const misInsumosPath = insumosBaseUrl + 'listado';
export const nuevoInsumoPath = insumosBaseUrl + 'nuevo-insumo';

export const purchasesListBaseUrl = '/listas-de-compra/';
export const listaComprasPath = purchasesListBaseUrl + 'listado';

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