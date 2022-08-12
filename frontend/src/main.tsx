import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { Provider } from 'react-redux';
import GlobalStyles from './styled-components/GlobalStyles';
import { store } from './redux/store';
import './services/url-service';
import './services/event-service';
import '../res/css/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>
  </React.StrictMode>
);

postMessage({ payload: 'removeLoading' }, '*');
