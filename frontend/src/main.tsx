import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './services/global-service';
import './services/url-service';
import './services/event-service';
import './modules/RestClient';
import './modules/WSClient';
import '../res/css/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

postMessage({ payload: 'removeLoading' }, '*');
