import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import App from './App';

import * as serviceWorker from './serviceWorker';

i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    react: { useSuspense: false },
    lng: 'en'
});

ReactDOM.render(
    <I18nextProvider i18n={i18next}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </I18nextProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
