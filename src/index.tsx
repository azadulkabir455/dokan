import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootswatch/dist/minty/bootstrap.min.css"
import { BrowserRouter as Router } from "react-router-dom"
import { GlobalContextContainer } from './contextAPI/GlobalContext';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalContextContainer>
        <Router>
          <App />
        </Router>
      </GlobalContextContainer>
    </Provider>
  </React.StrictMode>
);
