export default function LocalServiceWorkerRegister() {
    const swShellPath = `${process.env.PUBLIC_URL}/sw-shell.js`;
    // const swFetchPath = `${process.env.PUBLIC_URL}/sw-fetch.js`;
    // if ('serviceWorker' in navigator) {
    if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'production') {

        window.addEventListener('load', function () {
            navigator.serviceWorker.register(swShellPath).then(registration => {
                console.log('Service worker registered');
            });
        });

        // window.addEventListener('load', function () {
        //     navigator.serviceWorker.register(swFetchPath).then(registration => {
        //         console.log('Service worker registered');
        //     });
        // });

    }
}