import app from './app.js'
import './styles/styles.css'

if ('serviceWorker' in navigator && CONFIG.doPrecache)
	navigator.serviceWorker.register('/service-worker.js')

app.$mount('#app')