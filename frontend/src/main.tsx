import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { store } from './redux/store.ts';
import './App.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
