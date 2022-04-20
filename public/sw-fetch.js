
const db = {};

// Inicializar indexDB de Compras

const requestPurchase = window.indexedDB.open('MisCompras', 1);
requestPurchase.onsuccess = function( event ) {
    db.purchasesDB = event.result;
}
requestPurchase.onerror = function( err ) {
    window.alert("Por que no deja que esta app use indexDB ????");
}

// Inicializar indexDB de Insumos
const requestInsumos = window.indexedDB.open('MisInsumos', 1);
requestInsumos.onsuccess = function( event ) {
    db.insumosDB = event.result;
}
requestInsumos.onerror = function( err ) {
    window.alert("Por que no deja que esta app use indexDB ????");
}

// con esto retorno la informacion si esta en la cache, de los contrario consumo el servicio
self.addEventListener('fetch', function(e){
    console.log('[ServiceWorker] Fetch', e.request)

    e.respondWith(
        caches.match( e.request ).then(function( response ) {

            return response || fetch( e.request );
        })
    )
})