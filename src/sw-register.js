export default function LocalServiceWorkerRegister() {
    const swShellPath = `${process.env.PUBLIC_URL}/sw-shell.js`;

    if ('serviceWorker' in navigator) {
    // if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'production') {

        window.addEventListener('load', function () {
            navigator.serviceWorker.register(swShellPath).then(registration => {
                console.log('SHELL Service worker :: registered');
            });
        });

    }
}