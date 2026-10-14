
const CACHE = "mis-tareas-v1";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./icon-512.png"
];

// Instalar y guardar los archivos
self.addEventListener("install", evento => {
    evento.waitUntil(
        caches.open(CACHE).then(cache => {
            return cache.addAll(ARCHIVOS);
        })
    );

    self.skipWaiting();
});

// Activar la nueva versión
self.addEventListener("activate", evento => {
    evento.waitUntil(
        caches.keys().then(claves => {
            return Promise.all(
                claves
                    .filter(clave => clave !== CACHE)
                    .map(clave => caches.delete(clave))
            );
        })
    );

    self.clients.claim();
});

// Buscar primero en la caché
self.addEventListener("fetch", evento => {
    if (evento.request.method !== "GET") return;

    evento.respondWith(
        caches.match(evento.request).then(respuesta => {
            return respuesta || fetch(evento.request);
        })
    );
});
