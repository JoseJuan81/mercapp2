export const type = {
    auth: {
        login: '[auth] login',
        logout: '[auth] logout',
        userData: '[auth] user-data'
    },
    establishment: {
        set: '[establishment] set list of establisment in the state'
    },
    insumoDetails: {
        setData: '[insumo details] set insumos data'
    },
    insumos: {
        add: '[insumos] add new one to state',
        deleteInsumoById: '[insumos] delete insumo by id',
        filter: '[insumos] filtering insumos',
        getAll: '[insumos] get all insumos',
        favorites: '[insumos] get all favorites insumos',
        set: '[insumos] set insumos from API',
        search: '[insumos] searching insumos',
        select: '[insumos] select insumo',
        selectAll: '[insumos] select all insumos',
        unSelectAll: '[insumos] unselect all insumos',
        updateInsumos: '[insumos] update an insumo in insumos',
    },
    loading: {
        start: '[loading] start',
        end: '[loading] end',
    },
    localStorage: {
        establishments: '[mercapp2] establecimientos',
        insumos: '[mercapp2] insumos',
        newPurchase: '[mercapp2] nueva compra',
        purchases: '[mercapp2] compras',
        purchasesList: '[mercapp2] listas de compras',
        token: '[mercapp2] token',
        user: '[mercapp2] user-data',
    },
    notificationMessages: {
        bye: '👋 Vuelve pronto ✌🏽',
        establishmentsError: '😱 Error inesperado cargando establecimientos 😳',
        getInsumoDetails: '✅ Insumo cargado exitosamente',
        getInsumoDetailsError: '😱 Error al cargar informacion de insumo 😳',
        logout: '🥺 Cerrando sesion...',
        login: '🕙 Iniciando sesion',
        insumosLoaded: '✅ Insumos cargados',
        insumoUpdated: '😉 Insumo actualizado con exito 👍🏽',
        insumoUpdatedError: '😱 Error al actualizar insumo 😳',
        isFavoriteError: '😱 Error al actualizar insumo 😳',
        newInsumoCreated: '🎉 Insumo creado con exito 🎉',
        newInsumoCreatedError: '😱 Error al crear insumo 😳',
        newPurchaseCreated: '🎉 Compra creada con exito 🎉',
        newPurchaseInsumoRemoved: '✅ Insumo removido con exito 👍🏽',
        newPurchaseCreatedError: '😱 Error al crear compra 😳',
        newPurchaseNoEstablishmentError: '⚠️ Debe seleccionar un establecimiento',
        purchasesLoaded: '✅ Compras cargadas',
        purchasesLoadedError: '😱 Error cargar las compras 😳',
        welcome: '🎉 Bienvenido !!!',
    },
    newInsumo: {
        fill: '[new Insumo] filling form',
        reset: '[new Insumo] reset form',
        update: '[new Insumo] filling form to update',
    },
    newPurchase: {
        add: '[newPurchase] insumos to add',
        createBuy: '[newPurchase] create new buy from BD into state',
        remove: '[newPurchase] insumos to remove',
        selected: '[newPurchase] insumos to buy',
        total: '[newPurchase] calculate insumos total',
        update: '[newPurchase] update all new purchase',
        updateQuantity: '[newPurchase] update quantity in insumo',
        updateInsumoTotal: '[newPurchase] update total in insumo',
    },
    period: {
        month: 'month',
        week: 'week',
    },
    purchases: {
        getAll: '[purchases] get all purchases',
        multiSelect: '[purchases] purchases multi select',
        select: '[purchases] select a purchase',
        unselect: '[purchases] unselect a purchase',
        unselectAll: '[purchases] unselect all purchases',
    },
    search: {
        showSearch: '[search] show search insumos field',
        showFilter: '[search] show filter insumos field',
        hide: '[search] hide search and filter field',
    },
    views: {
        purchases: {
            card: 'card-list',
            table: 'table-list',
        }
    }
}