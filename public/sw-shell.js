var cacheName = 'mercapp2PWA-shell-v1';
var filesToCache = [
    '/',
    '/index.html',
    '/bundle.js',
    '/main.chunk.js',
    '/all.min.css',
    '/ramda.min.js'
];

// esto es para meter en cache los archivos html, css y js que quiera
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open( cacheName ).then( function(cache) {
            console.log('[service worker]: guardando en cache archivos');
            return cache.addAll(filesToCache)
        })
    )
})

// esto se hace para trabajar siempre con el cache actualizado ( nombre del cache )
// cuando se suben cambios en el proyecto que afectan los archivos guardados en cache por el sw
// se cambia el nombre de cacheName y se borra el anterior sw del navegador. De esta manera se trabaja con el sw
// actualizado
self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then( function( keyList ) {
            return Promise.all(keyList.map(function( key ) {
                if ( key !== cacheName ) {
                    console.log('[service worker]: eliminando el cache desactualizado');
                    return caches.delete( key );
                }
            }))
        })
    )
})