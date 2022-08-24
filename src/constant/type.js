export const type = {
    auth: {
        login: '[auth] login',
        logout: '[auth] logout',
        userData: '[auth] user-data'
    },
    newExpense: {
        update: '[new expense] update expense',
        reset: '[new expense] set initial state'
    },
    loading: {
        start: '[loading] start',
        end: '[loading] end',
    },
    localStorage: {
        newExpense: '[mercapp2] nuevo gasto',
        token: '[mercapp2] token',
        user: '[mercapp2] user-data',
    },
    notificationMessages: {
        bye: '👋 Vuelve pronto ✌🏽',
        logout: '🥺 Cerrando sesion...',
        login: '🕙 Iniciando sesion',
        welcome: '🎉 Bienvenido !!!',
    },
    timeFormat: {
        day: 'd LLL yy',
        month: 'LLL yy',
        week: 'wo yy',
    },
    timePeriod: {
        day: 'day',
        month: 'month',
        week: 'week',
    },
    user: {
        addExpense: '[user] add new expense to user expenses',
        data: '[user] get user data',
        deleteExpense: '[user] delete a expense in user data',
        logout: '[user] reset users initial state',
        update: '[user] update user data',
        updateExpense: '[user] update a expense in user data',
    },
}