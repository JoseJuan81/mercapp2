export const type = {
    establishment: {
        set: '[establishment] set list of establisment in the state'
    },
    insumos: {
        add: '[insumos] add new one to state',
        deleteInsumoById: '[insumos] delete insumo by id',
        filter: '[insumos] filtering insumos',
        getAll: '[insumos] get all insumos',
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
        user: '[local storage] user-data',
        insumos: '[local storage] insumos',
        token: '[local storage] token',
    },
    newInsumo: {
        fill: '[new Insumo] filling form',
        reset: '[new Insumo] reset form',
        update: '[new Insumo] filling form to update',
    },
    newPurchase: {
        add: '[newPurchase] insumos to add',
        clear: '[newPurchase] remove insumos from buy',
        createBuy: '[newPurchase] create new buy from BD into state',
        establishment: '[newPurchase] set establisment name',
        remove: '[newPurchase] insumos to remove',
        selected: '[newPurchase] insumos to buy',
        total: '[newPurchase] calculate insumos total',
        update: '[newPurchase] update all new purchase',
        updateQuantity: '[newPurchase] update quantity in insumo',
    },
    purchases: {
        getAll: '[purchases] get all purchases'
    },
    search: {
        showSearch: '[search] show search insumos field',
        showFilter: '[search] show filter insumos field',
        hide: '[search] hide search and filter field',
    },
    auth: {
        login: '[auth] login',
        logout: '[auth] logout',
        userData: '[auth] user-data'
    }
}