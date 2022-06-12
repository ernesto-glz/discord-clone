import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { WSProvider } from './contexts/ws.context';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './styled-components/GlobalStyles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <Provider store={store}>
      <WSProvider>
        <App />
      </WSProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
