import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';

import App from './App';
import i18n from './i18n';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </I18nextProvider>,
  document.getElementById('root')
);
serviceWorker.unregister();
