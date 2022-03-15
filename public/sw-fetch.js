
// con esto retorno la informacion si esta en la cache, de los contrario consumo el servicio
self.addEventListener('fetch', function(e){
    console.log('[ServiceWorker] Fetch', e.request.url)

    e.respondWith(
        caches.match( e.request ).then(function( response ) {
            return response || fetch( e.request );
        })
    )
})