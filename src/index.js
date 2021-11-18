import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';

import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegister';
import { MercApp } from './MercApp';

ReactDOM.render(
	<React.StrictMode>
		<MercApp />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// registrar el service worker
serviceWorkerRegistration.register();